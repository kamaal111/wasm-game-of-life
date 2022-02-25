#!/bin/sh

cd ..
wasm-pack build

cd www
npm i
npm run build

npx gh-pages -b gh-pages -d dist
