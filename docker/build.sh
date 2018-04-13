#!/bin/bash

clone_git() {
    echo "Cloning repo ..."
    git clone https://github.com/MarcoCaballero/testlink-plugin.git
    cd testlink-plugin
}

build_api() {
    echo "Building API ..."
    cd testlink-plugin
    mvn package -Dmaven.test.skip=true dockerfile:build
    docker tag marcocab/testlink-plugin-rest:1.0.0 marcocab/testlink-plugin-rest:dev
    cd .. 
}

build_front() {
    echo "Building GUI ..." 
    cd testlink-plugin-gui
    docker build -t marcocab/testlink-plugin-gui .
    docker tag marcocab/testlink-plugin-gui marcocab/testlink-plugin-gui:dev
    docker tag marcocab/testlink-plugin-gui marcocab/testlink-plugin-gui:1.0.0
    cd ..
}

if [ "$#" -eq 0 ]; then
    build_api
    build_front
else
    if [ "$1" == "--clone-git" ] || [ "$1" == "-cg" ]; then
        clone_git
    fi
    for var in "$@"
    do
        if [ "$var" == "--backend" ] || [ "$var" == "-b" ]; then
            build_api
        fi
        if [ "$var" == "--frontend" ] || [ "$var" == "-f" ]; then
            build_front
        fi
    done
fi