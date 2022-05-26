import { FileUtils, StandardizedFilePath } from "@ts-morph/common";
import { formatSourceWithoutFile } from "format-imports";
import { Project, SourceFile } from "ts-morph";

const sourceFileGlobs = ["src/**/*.ts", "!**/*.d.ts"];
const tsconfigGlob = "src/**/tsconfig*.json";

export function addTsSourceFiles(project: Project) {
    project.addSourceFilesAtPaths(sourceFileGlobs);
}

export function getTsSourceFiles(project: Project): SourceFile[] {
    return project.getSourceFiles(sourceFileGlobs);
}

export function addTsConfigsToProject(project: Project) {
    project.addSourceFilesAtPaths(tsconfigGlob);
}

export function getTsConfigsFromProject(project: Project): SourceFile[] {
    return project.getSourceFiles(tsconfigGlob);
}

export function getTsStyleRelativePath(from: StandardizedFilePath, to: StandardizedFilePath): string {
    let result: string = FileUtils.getRelativePathTo(FileUtils.getDirPath(from), to);
    if (!result.startsWith(".")) {
        result = `./${result}`;
    }
    return result.replace(/\\/g, "/");
}

const indent = " ".repeat(4);

let currentIndent = "";

export function log(message: string) {
    console.log(`${currentIndent}${message}`);
}

export function indentLog(fn: () => void) {
    const lastIndent = currentIndent;
    try {
        currentIndent += indent;
        fn();
    } finally {
        currentIndent = lastIndent;
    }
}

// Faster than organize imports, but may not always work as well.
export function formatImports(sourceFile: SourceFile) {
    const text = sourceFile.getFullText();
    const newText = formatSourceWithoutFile.sync(
        text,
        "ts",
        {
            maxLineLength: 120,
            tabSize: 4,
            wrappingStyle: {
                maxBindingNamesPerLine: 0,
                maxDefaultAndBindingNamesPerLine: 0,
                maxExportNamesPerLine: 0,
                maxNamesPerWrappedLine: 0,
            },
            formatExports: false,
            quoteMark: "double",
            eol: "CRLF",
        },
        { skipEslintConfig: true, skipTsConfig: true }
    );
    if (newText !== undefined) {
        sourceFile.replaceWithText(newText);
    }
}


export const namespacesDirName = "_namespaces";

export function isNamespaceBarrel(sourceFile: SourceFile): boolean {
    return sourceFile.getFilePath().includes(namespacesDirName)
}
