## Intro

First, do `npm i`. Then build the project by running `tsc -p .` in the root directory.

Then, from the UI-2 directory, run:

```
node ~/Projects/typeformer/dist/cli.js run --reset
```

To run **prettier** just do

```sh
npx prettier -c . # Will show what's gonna happen
npx prettier -w . # Will do ^
```

## Other notes

To step through subprocesses via execa, pass in the options

```
--inspect-brk=7000
```

Then in chrome:

(First you might have to connect the debugger via `chrome://inspect`)

```
devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:7000/2df21a01-44ff-40c4-b6ff-1f839f81f9d6
```

esbuild file that works:

```js
import * as esbuild from "../../../build/node_modules/esbuild/lib/main.js";

await esbuild.build({
    entryPoints: ["scripts/modules/_namespaces/Brightmetrics.ts"],
    bundle: true,
    target: "es2017",
    format: "iife",
    globalName: "Brightmetrics",
    outfile: "scripts/build/brightmetrics.js",
});
```

current esbuild warnings:

```
▲ [WARNING] Use "scripts/modules/ts/Brightmetrics/Reports/Enums/reportfieldtype.ts" instead of "scripts/modules/ts/Brightmetrics/Reports/Enums/ReportFieldType.ts" to avoid issues with case-sensitive file systems [different-path-case]

    scripts/modules/_namespaces/Brightmetrics.Reports.Enums.ts:9:14:
      9 │ export * from "../ts/Brightmetrics/Reports/Enums/ReportFieldType";
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

▲ [WARNING] Use "scripts/modules/ts/Brightmetrics/Reports/Enums/reporttype.ts" instead of "scripts/modules/ts/Brightmetrics/Reports/Enums/ReportType.ts" to avoid issues with case-sensitive file systems [different-path-case]

    scripts/modules/_namespaces/Brightmetrics.Reports.Enums.ts:12:14:
      12 │ export * from "../ts/Brightmetrics/Reports/Enums/ReportType";
         ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

▲ [WARNING] Use "scripts/modules/ts/Brightmetrics/PrintPreview/Enums/ReportType.ts" instead of "scripts/modules/ts/Brightmetrics/PrintPreview/Enums/reporttype.ts" to avoid issues with case-sensitive file systems [different-path-case]

    scripts/modules/_namespaces/Brightmetrics.PrintPreview.Enums.ts:3:14:
      3 │ export * from "../ts/Brightmetrics/PrintPreview/Enums/reporttype";
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

▲ [WARNING] Using direct eval with a bundler is not recommended and may cause problems [direct-eval]

    scripts/modules/ts/Brightmetrics/Admin/DataCustomization/Classes/expressionvalidator.ts:168:34:
      168 │                 if (!isRealNumber(eval(expression))) {
          ╵                                   ~~~~

  You can read more about direct eval and bundling here: https://esbuild.github.io/link/direct-eval

▲ [WARNING] Using direct eval with a bundler is not recommended and may cause problems [direct-eval]

    scripts/modules/ts/Brightmetrics/Insights/Scorecards/ViewModels/cell.ts:39:11:
      39 │     return eval(calc.replace(/{(\w+)}/g, () => String(args.shift() ?? 0)));
         ╵            ~~~~
```

## TODO

-   [x] Export all necessary things from JS.TS modules
-   [x] Fix all the little crap like bad references, etc.
-   [x] Make it easier to add things to patches-before and re-run typeformer
-   [x] Figure out global exporting
-   [x] esbuild
-   [x] Fix esbuild warnings + have before-patch fix errors (flowgrid)
-   [x] Organize imports so that stuff doesn't break at runtime

Then we _should_ be rid of all forms of `Brightmetrics` (aside from HTML ko binding references and aspx.cs references)

So far...

```
BEFORE MIGRATION:
Files:              704
Lines:           182240
Identifiers:     276766
Symbols:         298940
Types:           131108
Instantiations:  290086
Memory used:    517022K
I/O read:         0.02s
I/O write:        0.02s
Parse time:       0.45s
Bind time:        0.25s
Check time:       1.96s
Emit time:        0.82s
Total time:       3.48s

AFTER MIGRATION:
Files:              821
Lines:           174160
Identifiers:     267835
Symbols:         282794
Types:           124382
Instantiations:  282895
Memory used:    392471K
I/O read:         0.02s
I/O write:        0.00s
Parse time:       0.55s
Bind time:        0.22s
Check time:       1.93s
Emit time:        0.00s
Total time:       2.71s
```
