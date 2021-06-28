package main

import (
    "alpha.dagger.io/docker"
    "alpha.dagger.io/git"
)

// Relay for fetching a git repository
repo: git.#Repository & {
    remote: "https://github.com/crazy-max/docker-7zip"
    ref: "master"
}

// Relay for building a docker image
ctr: docker.#Build & {
    source: repo
}
