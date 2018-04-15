#!/usr/bin/env python

from subprocess import call
from termcolor import colored

f = open('VERSION', 'r')
version = f.read()


def tag_images():

    print "Tagging docker :dev images with the latest VERSION file:" + \
        colored("[" + version + "]", "blue")

    call(["docker", "tag", "marcocab/testlink-plugin-gui:dev",
          "marcocab/testlink-plugin-gui:1.0.0"])

    call(["docker", "tag", "marcocab/testlink-plugin-rest:dev",
          "marcocab/testlink-plugin-rest:1.0.0"])


def release_frontend():

    print "Pushing docker :dev frontend image with :dev and :" + \
        colored(version + " tags", "blue")

    call(["docker", "push", "marcocab/testlink-plugin-gui:dev"])
    call(["docker", "push", "marcocab/testlink-plugin-gui:" + version])


def release_backend():

    print "Pushing docker :dev backend image with :dev and :" + \
        colored(version + " tags", "blue")

    call(["docker", "push", "marcocab/testlink-plugin-rest:dev"])
    call(["docker", "push", "marcocab/testlink-plugin-rest:" + version])


print "Phase 1: " + colored("tag_images", "blue")
tag_images()
print colored("Done", "green")
print "Phase 2: " + colored("tag_images", "blue")
print colored("Done", "green")
release_frontend()
print "Phase 3: " + colored("tag_images", "blue")
release_backend()
print colored("Done", "green")
