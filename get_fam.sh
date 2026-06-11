#!/bin/sh
cat src/data/shades/asian-paints.json | grep '"family":' | sort | uniq
