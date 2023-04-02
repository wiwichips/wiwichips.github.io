#!/usr/bin/env sh

cp -r ../improbox/target/ imgprobox/.
cp -r ../improbox/pkg/ imgprobox/.

cp -r ../improbox/*.html imgprobox/.
cp -r ../improbox/*.js imgprobox/.
rm imgprobox/pkg/.gitignore

