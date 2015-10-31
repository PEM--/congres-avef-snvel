#!/bin/bash
rm -rf adminserver/bundle
cd ../admin
meteor build --architecture os.linux.x86_64 --directory ../docker/adminserver
cd -
