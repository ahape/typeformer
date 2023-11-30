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

Handy way of finding fork point for a branch:

```sh
git merge-base --fork-point <base-branch>
```

When merging in the latest from development FIRST you should make sure you have a clean copy of the files (`git rm --cached -r .`)

Sometimes you might need to run this command when applying patches one by one:

```
git am -3 --whitespace=fix --quoted-cr=nowarn --keep-cr <patch-file(s)>
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
-   [x] Consolidate globals to one file
-   [x] Fix SonarLint issues
-   [x] Update csproj/msbuild (use npm to build files)
-   [x] Add back datadefinitions.ts?
-   [x] Add builder for datadefinitions
-   [x] Update build.cmd and rebuild.cmd
-   [x] Remove rt-demo stuff from bundling? NO--too baked in.
-   [x] Determine what eslint rules to apply
-   [ ] Introduce await/async
-   [ ] Test stuff in app

## BUGS

-   [x] SessionKeepalive not found
-   [x] Page error dialog root tooltip not found
-   [x] Dashboard: SignalR undefined
