import * as tsMorph from "ts-morph";
import { getTsSourceFiles, log } from "./utilities.js";

const noiseSyntaxKinds: tsMorph.SyntaxKind[] = [
    tsMorph.SyntaxKind.SingleLineCommentTrivia,
    tsMorph.SyntaxKind.MultiLineCommentTrivia,
];

const noisyThings: Array<[string, string]> = [
    ["tslint:disable:object-literal-sort-keys", "%"],
    ["tslint:disable:no-reference", "%"],
    ["tslint:disable:max-classes-per-file", "%"],
    ["<reference path=", ".js.ts"],
    ["jshint", "%"],
];

export function stripNoise(project: tsMorph.Project): void {
    log("removing noise from files (outdated pragmas, etc.)");

    for (let sourceFile of getFilePaths(project)) {
        const filePath = sourceFile.getFilePath();
        const comments = sourceFile.getStatementsWithComments()
            .filter((s) => noiseSyntaxKinds.includes(s.getKind()));

        let changed = false;
        for (const comment of comments) {
            if (evaluateComment(comment, <string>filePath)) {
                changed = true;
                const statements = sourceFile.getStatementsWithComments();
                sourceFile = sourceFile.removeStatement(statements.indexOf(comment));
            }
        }

        if (changed) {
            sourceFile.saveSync();
        }
    }

    function evaluateComment(statement: tsMorph.Statement<tsMorph.ts.Statement>, filePath: string): boolean {
        const text = statement.getText();
        for (const [rule, exclude] of noisyThings) {
            if (text.indexOf(rule) !== -1 && !filePath.endsWith(exclude)) {
                return true;
            }
        }
        return false;
    }

    function getFilePaths(project: tsMorph.Project) {
        const pathRx = /(?<!\.d).ts$/; // No ambient modules
        return getTsSourceFiles(project).filter((f) => {
            const path = f.getFilePath();
            return pathRx.test(path);
        });
    }
}
