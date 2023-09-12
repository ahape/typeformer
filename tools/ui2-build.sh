#!/bin/bash
#
# Runs latest TS build against /UI-2
#
# Be sure to run from project root
#
TSC_PATH=/Users/alanhape/Projects/libs/TypeScript/built/local/
NODE=/opt/homebrew/bin/node
UI2=/Users/alanhape/Projects/projects-development/BrightMetricsWeb/BrightMetricsWeb.BrightMetricsWebUI/UI-2/

$NODE $TSC_PATH/tsc.js --diagnostics -p $UI2
