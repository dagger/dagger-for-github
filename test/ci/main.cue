package main

import (
	"dagger.io/dagger"

	"universe.dagger.io/alpine"
	"universe.dagger.io/bash"
)

dagger.#Plan & {
	client: env: {
		// these should be set by the action runtime
		ACTIONS_RUNTIME_TOKEN: string
		ACTIONS_CACHE_URL:     string
	}

	actions: test: {
		image: alpine.#Build & {
			packages: bash: {}
		}

		bash.#Run & {
			input: image.output
			script: contents: "echo Hello World!"
		}
	}
}
