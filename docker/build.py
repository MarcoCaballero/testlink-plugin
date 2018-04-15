#!/usr/bin/python

import sys
import os
import optparse
from subprocess import call
from termcolor import colored

parser = optparse.OptionParser()
parser.add_option('-f', '--frontend', action='store_true', dest='frontend',
                  help='Builds the frontend with the Dockerfile in the root of `testlink-plugin/testlink-plugin-gui`directory')
parser.add_option('-b', '--backend', action='store_true', dest='backend',
                  help='Builds the backend with the Dockerfile in the root of `testlink-plugin/testlink-plugin`directory, using maven')

(options, args) = parser.parse_args()

builded = ""

def cd(path):
    os.chdir(path)


def build_frontend():
    cd('../testlink-plugin-gui')
    print "Building" + colored("Angular ", "red") + "frontend, with :dev tag ..."
    call(["docker", "build", "-t", "marcocab/testlink-plugin-gui:dev", "."])
    global builded
    print colored("Done", "green")
    builded += " [FRONTEND] "
    cd('../docker')


def build_backend():
    cd('../testlink-plugin')
    print "Building " + colored("SpringBoot ", "green") + "backend, with :dev tag ..."
    call(["mvn", "package", "-Dmaven.test.skip=true", "dockerfile:build"])
    global builded
    print colored("Done", "green")
    builded += " [BACKEND] "


if options.frontend is True:
    build_frontend()

if options.backend is True:
    build_backend()

print colored("Done, builded:", "green") + colored (builded, "blue")
