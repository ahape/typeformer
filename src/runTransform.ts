import { Command, Option } from "clipanion";
import fs from "fs";
import { globbySync } from "globby";
import { performance } from "perf_hooks";
import prettyMs from "pretty-ms";

import { getMergeBase, runNode, runNodeDebug, runWithOutput as run } from "./exec.js";
import { afterPatchesDir, beforePatchesDir, packageRoot } from "./utilities.js";

export class RunTransformCommand extends Command {
    static paths = [["run"], ["run-transform"]];

    static usage = Command.Usage({
        description: "Runs all transforms and applies fixup patches.",
    });

    reset = Option.Boolean("--reset", true, {
        description: "Reset the current branch to its merge base with main before running.",
    });

    async execute() {
        if (this.reset) {
            await run("git", "restore", "--staged", "."); // Unstage all changes.
            await run("git", "restore", "."); // Undo all changes.
            await run("git", "clean", "-fd"); // Remove any potentially new files.
            const mergeBase = await getMergeBase(run);
            await run("git", "reset", "--hard", mergeBase); // Reset back to the merge base.
        }

        // await run("npm", "ci");

        await applyPatches(beforePatchesDir);

        // await run("npm", "ci");

        // Verify that we can process the code.
        // await generateDiagnostics();
        // await noopStep();

        await runMorph(
            "unindent",
            `
This step makes further commits look clearer by unindenting all
of the top level namespaces preemptively.
`
        );

        await runMorph(
            "explicitify",
            `
This step makes all implicit namespace accesses explicit, e.g. "Node" turns into
"ts.Node".
`
        );

        await runMorph(
            "stripNamespaces",
            `
This step converts each file into an exported module by hoisting the namespace
bodies into the global scope and transferring internal markers down onto declarations
as needed.

The namespaces are reconstructed as "barrel"-style modules, which are identical
to the old namespace objects in structure. These reconstructed namespaces are then
imported in the newly module-ified files, making existing expressions like "ts." valid.
`
        );

        await runMorph(
            "skipTypeCheckingJsTsFiles",
            "Adding statements to skip .js.ts file type checking");

        await runMorph(
            "inlineImports",
            `
This step converts as many explicit accesses as possible in favor of direct imports
from the modules in which things were declared. This restores the code (as much as possible)
back to how it looked originally before the explicitify step, e.g. instead of "ts.Node"
and "ts.Symbol", we have just "Node" and "Symbol".
`
        );

        await createGitBlameIgnoreRevs();

        await applyPatches(afterPatchesDir);

        console.log("Done");

        // await run("npm", "ci");

        // Make sure what we get back from our new diagnostics script still compiles.
        // Disabled for now, since the patches undo the "pre" patches that allow ts-morph
        // to load the program, and also the build system may not be gulp.
        // await generateDiagnostics();
        // await noopStep();
    }
}

async function generateDiagnostics() {
    await run("rm", "-f", "src/compiler/diagnosticInformationMap.generated.ts");
    await run("npx", "gulp", "generate-diagnostics");
}

function reformatParagraphs(s: string) {
    return s
        .split(/\r?\n\r?\n/)
        .map((paragraph) =>
            paragraph
                .split(/\r?\n/)
                .map((line) => line.trim())
                .join(" ")
                .trim()
        )
        .join("\n\n")
        .trim();
}

async function runAndCommit(message: string, fn: () => Promise<any>) {
    await fn();
    await run("git", "add", ".");
    await run("git", "commit", "--quiet", "-m", reformatParagraphs(message));
}

async function runMorph(name: string, description: string) {
    await runAndCommit(`Generated module conversion step - ${name}\n\n${description}`, async () => {
        const before = performance.now();
        if (name == "skipTypeCheckingJsTsFiles") {
          await runNodeDebug(packageRoot, "morph", name);
        } else {
          await runNode(packageRoot, "morph", name);
        }
        console.log(`took ${prettyMs(performance.now() - before)}`);
    });
}

async function noopStep() {
    await runNode(packageRoot, "morph", "noop");
}

async function applyPatches(patchDir: string) {
    // Regenerate patches by running `save-patches`.
    await run(
        "git",
        "am",
        "--3way",
        "--whitespace=nowarn",
        "--quoted-cr=nowarn",
        "--keep-cr",
        ...globbySync(`${patchDir}/*.patch`) // git am doesn't accept a regular directory, only a "Maildir" (which is something different)
    );
}

async function createGitBlameIgnoreRevs() {
    await runAndCommit("Generated module conversion step - .git-ignore-blame-revs", async () => {
        const mergeBase = await getMergeBase(run);

        const { stdout } = await run(
            "git",
            "log",
            "--grep=Generated module conversion step",
            "--pretty=format:# %s%n%H",
            `${mergeBase}..HEAD`
        );

        const output = stdout.replace(/\r?\n/g, "\n").trim() + "\n";
        await fs.promises.writeFile(".git-blame-ignore-revs", output);

        // TODO(jakebailey): also change other files? Or do in a later patch?
    });
}
