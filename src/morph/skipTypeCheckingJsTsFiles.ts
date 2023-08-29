import * as tsMorph from "ts-morph";
import {
    getTsSourceFiles,
    log,
} from "./utilities.js";

export function skipTypeCheckingJsTsFiles(project: tsMorph.Project): void {
    log("enumerating .js.ts files and adding @ts-nocheck statements");

    for (const sourceFile of getTsSourceFiles(project)) {
        if (sourceFile.getFilePath().endsWith(".js.ts")) {
            sourceFile.insertStatements(0, "// @ts-nocheck");
            sourceFile.saveSync();
        }
    }
}
