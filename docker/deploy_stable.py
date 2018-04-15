#!/usr/bin/env python

from subprocess import call
from termcolor import colored


def tag_images_stable():

    print "Pushing current :dev backend image with" + colored(" :stable ", "blue") + "and " + colored(" :latest ", "blue") + "tags"

    call(["docker", "tag", "marcocab/testlink-plugin-gui:dev",
          "marcocab/testlink-plugin-gui:stable"])
    call(["docker", "tag", "marcocab/testlink-plugin-gui:dev",
          "marcocab/testlink-plugin-gui:latest"])

    call(["docker", "tag", "marcocab/testlink-plugin-rest:dev",
          "marcocab/testlink-plugin-rest:stable"])
    call(["docker", "tag", "marcocab/testlink-plugin-rest:dev",
          "marcocab/testlink-plugin-rest:latest"])


def release_stable_frontend():

    print "Pushing current :dev frontend image with" + colored(" :stable ", "blue")  + "and " + colored(" :latest ", "blue") + "tags"

    call(["docker", "push", "marcocab/testlink-plugin-gui:stable"])
    call(["docker", "push", "marcocab/testlink-plugin-gui:latest"])


def release_stable_backend():

    print "Pushing current :dev backend image with" + colored(" :stable ", "blue")  + "and " + colored(" :latest ", "blue") + "tags"

    call(["docker", "push", "marcocab/testlink-plugin-rest:stable"])
    call(["docker", "push", "marcocab/testlink-plugin-rest:latest"])

print "Phase 1: " + colored("tag_images_stable", "blue")
tag_images_stable()
print colored("Done", "green")
print "Phase 2: " + colored("release_stable_frontend", "blue")
release_stable_frontend()
print colored("Done", "green")
print "Phase 3: " + colored("release_stable_backend", "blue")
release_stable_backend()
print colored("Done", "green")
