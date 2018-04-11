#!/bin/bash

echo "Cloning repo ..."
git clone https://github.com/MarcoCaballero/testlink-plugin.git

echo "Building API - REST"
cd testlink-plugin
mvn dockerfile:build
cd .. 

echo "Building GUI" ...
cd testlink-plugin-gui
docker build -t marcocab/testlink-plugin-gui