# Testlink-plugin

[![License badge](https://img.shields.io/hexpm/l/plug.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![Build Status](https://api.travis-ci.org/MarcoCaballero/testlink-plugin.svg?branch=master)](https://travis-ci.org/MarcoCaballero/testlink-plugin)
[![Quality Gate](https://sonarcloud.io/api/badges/gate?key=com.marco.tlp%3Atestlink-plugin-rest)](https://sonarcloud.io/dashboard/index/com.marco.tlp%3Atestlink-plugin-rest)

* [Introduction](https://github.com/MarcoCaballero/testlink-plugin#introduction)
* [Requirements](https://github.com/MarcoCaballero/testlink-plugin#requirements)
* [Install & Run](https://github.com/MarcoCaballero/testlink-plugin#install--run)
* [Build your own images](https://github.com/MarcoCaballero/testlink-plugin#build-your-own-images)
* [Languages](https://github.com/MarcoCaballero/testlink-plugin#languages)
* [Tech Stack](https://github.com/MarcoCaballero/testlink-plugin#tech-stack)
* [Author](https://github.com/MarcoCaballero/testlink-plugin#author)

## Introduction

Testlink-plugin provides an API Rest as well as an Angular Material SPA interface to execute the tests allocated in some TestLink instance reachable throught TCP/IP (HTTP/S in that case) by using the Testlink XML-RPC API.

## Requirements

There are different requirements if you want to run it in containerized or native way.
For the first one is quite easy, containerized way, all you need is **DOCKER**.

* Docker CE (or EE).
* Docker-Compose
* Python (should modify dockerfiles to [Build your own images](https://github.com/MarcoCaballero/testlink-plugin#build-your-own-images))

For the second one, native way, we need the following requirements:

* Java 8 (or higher).
* Apache Maven.
* Node 8 (or higher) and npm (recommended `nvm install --lts`, node v8.11.1 & npm v5.6.0).
* angular-cli (recommended globally, but provided locally).

## Install & Run

Again we have different ways to install and test the software, personally, I recommend Docker Way.
With Docker, is possible to create the whole system without installing all the dependencies and system environment, for that, in this repository `Apache + Testlink + MariaDB` environment is provided (Thanks to bitnami) as well as the needed to deploy the software with Docker.

### Docker Steps

* Clone the repository (if is not cloned yet)

    `git clone https://github.com/MarcoCaballero/testlink-plugin.git`

* Accessing to docker folder

    `cd testlink-plugin/Docker`

* Start the whole system with the `:stable` versions

    `docker-compose up -d`

#### Other useful commands

* Accessing to live logging

    `docker-compose logs -f`

* Accessing to containers

    `docker-compose exec [tlp/tlp-gui] sh`

* Start/Stop services

    `docker-compose [start/stop] [tlp/tlp-gui]`

* Stops all services removing intermediates and volumes

    `docker-compose down --volumes --remove-orphans`

### frontend

front-end available at <http:///localhost:4200/>

### backend

API Rest available at <http://localhost:8080/tlp-api>

API Docs available at <http://localhost:8080/v2/api>

API Docs GUI available at <http://localhost:8080/swagger-ui.html>

### TestLink

TestLink available at <http://localhost:80/>

## Build your own images

From the testlink-plugin/docker folder  execute the following command:

```text
Usage: build.py [options]

Options:
  -h, --help      show this help message and exit
  -f, --frontend  Builds the frontend with the Dockerfile in the root of
                  `testlink-plugin/testlink-plugin-gui`directory
  -b, --backend   Builds the backend with the Dockerfile in the root of
                  `testlink-plugin/testlink-plugin`directory, using maven
```

## Languages

* Java

* TypeScript

* Python

* HTML5

* Sass

* JavaScript

## Tech Stack

### Dev Dependencies

* SpringBoot

* Maven

* Jacoco

* Swagger

* testlinkjavaapi

* Angular

* Teradata Covalent

* Docker, Docker-Compose

* Sonar (sonarcloud)

* Travis

### Test Dependencies

* Hamcrest, Mockito, jUnit, RestAssured, ... (springboot-test dependencies)

* Karma, Protactor.

* TestLink.

* HTTP requests with VSCode plugin - **humao.rest-client** , (.http || .rest)

### 3rd parties (E2E Environment)

* TestLink

* MariaDB

* Bitnami

## Author

Marco Caballero (MarcoCab), <https://www.linkedin.com/in/marco-caballero/>