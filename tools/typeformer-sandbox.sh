#!/bin/bash
UI2=/Users/alanhape/Projects/projects-development/BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/
TYPEFORMER=/Users/alanhape/Projects/typeformer/

cp $TYPEFORMER/sandbox.html $UI2/index.html
cd $UI2

/opt/homebrew/bin/python3 -m http.server 8080
