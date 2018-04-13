#!/bin/bash
echo "tagging frontend with :stable, and :latest"
docker tag marcocab/testlink-plugin-gui marcocab/testlink-plugin-gui:stable
docker tag marcocab/testlink-plugin-gui marcocab/testlink-plugin-gui:latest
echo "tagging backend with :stable, and :latest"
docker tag marcocab/testlink-plugin-rest marcocab/testlink-plugin-rest:stable
docker tag marcocab/testlink-plugin-rest marcocab/testlink-plugin-rest:latest
echo "pushing frontend with :stable, and :latest"
docker push marcocab/testlink-plugin-gui:stable
docker push marcocab/testlink-plugin-gui:latest
echo "pushing backend with :stable, and :latest"
docker push marcocab/testlink-plugin-rest:stable
docker push marcocab/testlink-plugin-rest:latest