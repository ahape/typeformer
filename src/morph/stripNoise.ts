import * as tsMorph from "ts-morph";
import { getTsSourceFiles, log } from "./utilities.js";

const noisyThings: Array<[string, string]> = [
    ["tslint", "%"],
    ["<reference path=", ".js.ts"],
    ["jshint", "%"],
];

export function stripNoise(project: tsMorph.Project): void {
    log("removing dead comments (tslint rules, etc)");

    for (let sourceFile of getFilePaths(project)) {
        const filePath = sourceFile.getFilePath();
        const statements = [
            ...sourceFile.getDescendantsOfKind(tsMorph.ts.SyntaxKind.SingleLineCommentTrivia),
            ...sourceFile.getDescendantsOfKind(tsMorph.ts.SyntaxKind.MultiLineCommentTrivia),
        ] as tsMorph.Statement[];
        let changed = false;

        statements.forEach((statement) => {
            const text = statement.getText();
            for (const [rule, exclude] of noisyThings) {
                if (text.indexOf(rule) !== -1 && !filePath.endsWith(exclude)) {
                    statement.remove();
                    changed = true;
                }
            }
        });

        if (changed) {
            sourceFile.saveSync();
        }
    }

    function getFilePaths(project: tsMorph.Project) {
        const pathRx = /(?<!\.d).ts$/; // No ambient modules
        return getTsSourceFiles(project).filter((f) => {
            const path = f.getFilePath();
            return pathRx.test(path);
        });
    }
}
