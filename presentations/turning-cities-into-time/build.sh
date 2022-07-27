#!/bin/sh

set -euo pipefail

pandoc --no-highlight -f markdown -t html index.md > ref.html

