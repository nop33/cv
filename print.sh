#!/bin/sh
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
chrome --headless --disable-gpu --print-to-pdf=dist/cv.pdf dist/index.html
