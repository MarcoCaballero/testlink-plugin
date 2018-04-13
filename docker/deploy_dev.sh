#!/bin/bash
VERSION=$(cat docker/VERSION)

echo "tagging frontend with :dev, and :$VERSION"
docker tag marcocab/testlink-plugin-gui:dev marcocab/testlink-plugin-gui:$VERSION

echo "tagging backend with :dev, and :$VERSION"
docker tag marcocab/testlink-plugin-rest:$VERSION marcocab/testlink-plugin-rest:dev

echo "pushing frontend with :dev, and :$VERSION"
docker push marcocab/testlink-plugin-gui:dev
docker push marcocab/testlink-plugin-gui:$VERSION

echo "pushing backend with :dev, and :$VERSION"
docker push marcocab/testlink-plugin-rest:dev
docker push marcocab/testlink-plugin-rest:$VERSION