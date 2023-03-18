#!/usr/bin/env sh

cp -r ../improbox/*.html imgprobox/.
cp -r ../improbox/*.js imgprobox/.
cp -r ../improbox/target/ imgprobox/target/
cp -r ../improbox/pkg/ imgprobox/pkg/
rm imgprobox/pkg/.gitignore

