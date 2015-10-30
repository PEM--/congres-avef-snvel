#!/bin/bash
rm -rf admin/bundle
cd ../admin
meteor build --architecture os.linux.x86_64 --directory ../docker/admin
cd -
