### Intro

First, do `npm i`. Then build the project by running `tsc -p .` in the root directory.

Then, from the UI-2 directory, run:
```
node ~/Projects/typeformer/dist/cli.js run --reset
```
### Other notes

To step through subprocesses via execa, pass in the options
```
--inspect-brk=7000
```

Then in chrome:
```
devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:7000/2df21a01-44ff-40c4-b6ff-1f839f81f9d6
```
