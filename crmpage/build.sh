#!/bin/sh
rm -rf output
mkdir -p output/webroot/fe/mis
mkdir -p output/webroot/fe/mis/static
mkdir -p output/webroot/fe/mis/test
mkdir -p output/webroot/fe/mis/tpl

cp -r ./*  output/webroot/fe/mis
rm output/webroot/fe/mis/build.sh

cd output
find ./ -name .svn -exec rm -rf {} \;

tar cvzf misserver-fe.tar.gz webroot
rm -rf webroot 

