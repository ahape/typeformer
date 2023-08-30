import * as tsMorph from "ts-morph";
import { getTsSourceFiles, log } from "./utilities.js";

export function skipTypeCheckingJsTsFiles(project: tsMorph.Project): void {
    log("enumerating .js.ts files and adding @ts-nocheck statements");

    for (let sourceFile of getTsJsFilePaths(project)) {
        const pragmas = sourceFile.getStatementsWithComments().filter((s) => s.getKind() === 2 /*pragma*/);
        // Remove all pre-existing pragmas since they are artifacts this
        // point in the transformation process.
        let changed = false;
        for (const pragma of pragmas) {
            const statements = sourceFile.getStatementsWithComments();
            sourceFile = sourceFile.removeStatement(statements.indexOf(pragma));
            changed = true;
        }

        if (changed) {
            sourceFile.saveSync();
        }
    }

    for (const sourceFile of getTsJsFilePaths(project)) {
        // Add just one nocheck pragma at the top of the file. The reason
        // we have to do this is "stringNamespaces" adds its imports to the
        // top of the file, and so in order for the compiler to ignore
        // type-checking these files, the nocheck pragma needs to go at the
        // very top of the file.
        sourceFile.insertStatements(0, "// @ts-nocheck");
        sourceFile.saveSync();
    }

    function getTsJsFilePaths(project: tsMorph.Project) {
        return getTsSourceFiles(project).filter((f) => f.getFilePath().endsWith(".js.ts"));
    }
}
