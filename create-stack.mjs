//@ts-check

import assert from "assert";
import { readFileSync } from "fs";
import { $, cd, question, which } from "zx";

const repoName = "jakebailey/TypeScript";

// Make sure we have the gh tool.
await which("gh");

// Ensure we're in the typescript repo.
const packageJson = readFileSync("package.json", { encoding: "utf-8" });
assert(JSON.parse(packageJson).name === "typescript");

async function getMergeBase() {
    const { stdout } = await $`git merge-base --all HEAD main`;

    const lines = stdout.trim().split(/\r?\n/);
    assert(lines.length === 1);
    const mergeBase = lines[0].trim();
    assert(mergeBase);
    return mergeBase;
}

const mergeBase = await getMergeBase();

/**
 * @param {number} i
 */
function branchName(i) {
    return `transform-stack-commit-${i}`;
}

async function getPlan() {
    const { stdout } = await $`git log --pretty=oneline --reverse ${mergeBase}..HEAD`;

    return stdout
        .trim()
        .split(/\r?\n/)
        .map((s, i, array) => {
            s = s.trim();
            const first = i === 0;
            const last = i === array.length - 1;
            const humanIndex = i + 1;

            const spaceIndex = s.indexOf(" ");
            const commit = s.substring(0, spaceIndex).trim();
            const message = s.substring(spaceIndex + 1).trim();
            return {
                branch: branchName(humanIndex), // Branch to cherry-pick to
                previousBranch: first ? undefined : branchName(humanIndex - 1), // Base to rebase branch to
                commit, // Commit to cherry pick
                prBase: first ? "main" : branchName(humanIndex - 1), // Branch to send PR to
                message, // Message
                nextBranch: last ? undefined : branchName(humanIndex + 1), // Branch to send PR to
            };
        });
}

const plan = await getPlan();

let ok = await question("Ready? (y/n) ", {
    choices: ["y", "n"],
});

if (ok !== "y") {
    process.exit(1);
}

const pwd = process.cwd();

const worktree = ".git/tmp/stack-worktree";

for (const step of plan) {
    if (!step.previousBranch) {
        await $`git worktree remove --force ${worktree} || true`;
        await $`git worktree add -B ${step.branch} ${worktree} ${mergeBase}`;
        cd(worktree);
    } else {
        await $`git switch -C ${step.branch} ${step.previousBranch}`;
    }

    await $`git cherry-pick ${step.commit}`;
    await $`git push --force -u origin HEAD`;

    let body = "This PR is a part of a stack:\n";
    for (const otherStep of plan) {
        if (otherStep === step) {
            body += `\n  1. ${otherStep.message} (this PR)`;
        } else {
            body += `\n  1. [${otherStep.message}](https://github.com/${repoName}/pull/${otherStep.branch})`;
        }
    }

    try {
        await $`gh pr create -R ${repoName} --draft --base ${step.prBase} --head ${step.branch} --title ${step.message} --body ${body}`;
    } catch {
        await $`gh pr edit ${step.branch} -R ${repoName} --title ${step.message} --body ${body}`;
    }
}

cd(pwd);

await $`git worktree remove --force ${worktree}`;
