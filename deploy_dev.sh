#!/bin/bash
echo "tagging frontend with :dev, and :1.0.0"
docker tag marcocab/testlink-plugin-gui marcocab/testlink-plugin-gui:dev
docker tag marcocab/testlink-plugin-gui marcocab/testlink-plugin-gui:1.0.0
echo "tagging backend with :dev, and :1.0.0"
docker tag marcocab/testlink-plugin-rest marcocab/testlink-plugin-rest:dev
docker tag marcocab/testlink-plugin-rest marcocab/testlink-plugin-rest:1.0.0
echo "pushing frontend with :dev, and :1.0.0"
docker push marcocab/testlink-plugin-gui:dev
docker push marcocab/testlink-plugin-gui:1.0.0
echo "pushing backend with :dev, and :1.0.0"
docker push marcocab/testlink-plugin-rest:dev
docker push marcocab/testlink-plugin-rest:1.0.0