package main

import (
	"dagger.io/dagger"

	"universe.dagger.io/alpine"
	"universe.dagger.io/bash"
)

dagger.#Plan & {
	actions: {
		params: greeting: string | *"world"

		test: {
			image: alpine.#Build & {
				packages: bash: {}
			}

			bash.#Run & {
				input: image.output
				script: contents: "echo hello \(params.greeting)"
			}
		}
	}
}
