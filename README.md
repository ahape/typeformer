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

JS.TS files ordered by size:

```
alanhape@Alans-Air projects-development % git ls-f | grep "js\.ts" | xargs -I% wc % | sort -r 
WARNING: You called a Git command named 'ls-f', which does not exist.
Continuing in 0.2 seconds, assuming that you meant 'ls-files'.
    1431    3788   46490 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/flowgrid.js.ts
    1152    3372   44730 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/ko-extensions.js.ts
     991    2263   43279 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/userManagement.js.ts
     952    2534   26890 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/utils.js.ts
     940    2692   40702 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/schedulesmanagement.js.ts
     778    2044   27744 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/CallFlow/callFlow.js.ts
     718    1557   26899 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/usermanagementremoveuserdialog.js.ts
     586    1418   20986 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/usermanagementuserdialog.js.ts
     546    1405   23025 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/dashboardManagement.js.ts
     537    1150   19022 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/roleManagement.js.ts
     524    1256   20323 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/admin.js.ts
     441    1092   18265 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/reportManagement.js.ts
     421     942   13707 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/models/roleViewModel.js.ts
     375     833   12192 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/rolemanagementdataviewfilterdialog.js.ts
     349    1212   10246 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewBox.js.ts
     335     733    9878 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/helpvideodialog.js.ts
     321     680   11883 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/roleManagementRoleDialog.js.ts
     317     724    9763 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/textfilterdialog.js.ts
     304     733   12055 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/userManagementRemoveUsersDialog.js.ts
     299     648    8902 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/emailoptionsdialog.js.ts
     289     695    9484 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/CallRoutingDiagramView/callRoutingDiagramView.js.ts
     284     710   10352 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/models/userPermission.js.ts
     275     740    9668 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/datepicker.js.ts
     241     671    8584 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/alertsettingsdialog.js.ts
     204     447    5768 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/datasourceselectiondialog.js.ts
     191     396    5934 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/roleManagementUserAssignmentDialog.js.ts
     190     386    6385 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/rolemanagementdataviewdialog.js.ts
     168     343    3839 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/constants.js.ts
     148     333    4630 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/thresholdoptionsdialog.js.ts
     142     324    4517 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/emaildialog.js.ts
     135     261    3489 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/dashboardmanagementtickerdialog.js.ts
     128     231    3034 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/textthresholdoptionsdialog.js.ts
     115     257    3176 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/adminpage.js.ts
      88     152    2101 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/usermanagementapprovebulkdialog.js.ts
      80     163    1901 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/auditLogsManagement.js.ts
      75     161    1687 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/models/dataViewViewModel.js.ts
      71     139    1610 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/ssoManagement.js.ts
      70     141    1574 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/admin/companySettingsManagement.js.ts
      49     115    1492 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/models/dashboardlinkmodel.js.ts
      47     149    1294 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/viewmodels/pages/CallFlow/callFlowPage.js.ts
       1       2      16 BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/scripts/modules/index.js.ts
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
-   [x] Introduce await/async
-   [x] Split up utils class (for easier testing)
-   [x] Split up constants class (for easier testing)
-   [x] Refactor globals
-   [ ] Convert .js.ts -> .ts
-   [ ] Create unit tests
-   [ ] Test stuff in app
