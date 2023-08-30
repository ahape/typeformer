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

## TODO

-   [x] Export all necessary things from JS.TS modules
-   [x] Fix all the little crap like bad references, etc.
-   [ ] Make it easier to add things to patches-before and re-run typeformer
-   [ ] Figure out global exporting
-   [ ] esbuild?
-   [ ] Make work with bugsnag branch?
-   [ ] Maybe don't use barrel-style modules?

Then we _should_ be rid of all forms of `Brightmetrics` (aside from HTML ko binding references and aspx.cs references)
