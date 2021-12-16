package main

import (
	"alpha.dagger.io/docker"
	"alpha.dagger.io/git"
)

ctr: docker.#Build & {
	source: git.#Repository & {
		remote: "https://github.com/crazy-max/docker-fail2ban.git"
		ref: "refs/tags/0.11.2-r3"
		keepGitDir: true
	}
}
