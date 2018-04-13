#!/bin/bash
VERSION=$(cat docker/VERSION)

echo "tagging frontend with :stable, and :latest"
docker tag marcocab/testlink-plugin-gui:dev marcocab/testlink-plugin-gui:stable
docker tag marcocab/testlink-plugin-gui:dev marcocab/testlink-plugin-gui:latest
docker tag marcocab/testlink-plugin-gui:dev marcocab/testlink-plugin-gui:$VERSION

echo "tagging backend with :stable, and :latest"
docker tag marcocab/testlink-plugin-rest:$VERSION marcocab/testlink-plugin-rest:stable
docker tag marcocab/testlink-plugin-rest:$VERSION marcocab/testlink-plugin-rest:latest
docker tag marcocab/testlink-plugin-rest:$VERSION marcocab/testlink-plugin-rest:dev

echo "pushing frontend with :stable, and :latest"
docker push marcocab/testlink-plugin-gui:stable
docker push marcocab/testlink-plugin-gui:latest
docker push marcocab/testlink-plugin-gui:dev
docker push marcocab/testlink-plugin-gui:$VERSION

echo "pushing backend with :stable, and :latest"
docker push marcocab/testlink-plugin-rest:stable
docker push marcocab/testlink-plugin-rest:latest
docker push marcocab/testlink-plugin-rest:dev
docker push marcocab/testlink-plugin-rest:$VERSION

