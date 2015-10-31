#!/bin/bash
rm -rf appserver/bundle nginx/bundle
cd ../app
meteor build --architecture os.linux.x86_64 --directory ../docker/appserver
cd -
cp -R appserver/bundle nginx
