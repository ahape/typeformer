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

Running eslint:

```sh
cd build
npx eslint -c .eslintrc.js ../BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/ts/Brightmetrics/**/*.ts
```

Handy way of finding fork point for a branch:

```sh
git merge-base --fork-point <base-branch>
```

## TODO

-   [x] Export all necessary things from JS.TS modules
-   [x] Fix all the little crap like bad references, etc.
-   [x] Make it easier to add things to patches-before and re-run typeformer
-   [x] Figure out global exporting
-   [x] esbuild
-   [x] Fix esbuild warnings + have before-patch fix errors (flowgrid)
-   [x] Organize imports so that stuff doesn't break at runtime
-   [x] Base from enhancements/bugsnag
-   [x] Get working with TSLint
-   [x] Clean up comments and excess
-   [x] Update npm modules
-   [x] Move package.json to UI-2/
-   [ ] Consolidate globals to one file
-   [ ] Fix SonarLint issues
-   [ ] Update csproj/msbuild (use npm to build files)
-   [ ] Add back datadefinitions.ts?
-   [ ] Add builder for datadefinitions
-   [ ] Update build.cmd and rebuild.cmd
-   [ ] Remove rt-demo stuff from bundling?

## BUGS

-   [x] SessionKeepalive not found
-   [x] Page error dialog root tooltip not found
-   [x] Dashboard: SignalR undefined
