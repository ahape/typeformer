#!/bin/bash

UI2=/Users/alanhape/Projects/projects-development/BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/
TYPEFORMER=/Users/alanhape/Projects/typeformer/
PYTHON=/opt/homebrew/bin/python3

cp $TYPEFORMER/sandbox.html $UI2/index.html

#cd $UI2
cd $UI2/..

$PYTHON -m http.server 8080
