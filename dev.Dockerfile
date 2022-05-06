# syntax=docker/dockerfile:1

ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-alpine AS base
RUN apk add --no-cache cpio findutils git
WORKDIR /src

FROM base AS deps
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules <<EOT
yarn install
mkdir /vendor
cp yarn.lock /vendor
EOT

FROM scratch AS vendor-update
COPY --from=deps /vendor /

FROM deps AS vendor-validate
RUN --mount=type=bind,target=.,rw <<EOT
set -e
git add -A
cp -rf /vendor/* .
diff=$(git status --porcelain -- yarn.lock)
if [ -n "$diff" ]; then
  echo >&2 'ERROR: Vendor result differs. Please vendor your package with "docker buildx bake vendor-update"'
  echo "$diff"
  exit 1
fi
EOT

FROM deps AS build
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules <<EOT
yarn run build
mkdir /out
cp -Rf dist /out/
EOT

FROM scratch AS build-update
COPY --from=build /out /

FROM build AS build-validate
RUN --mount=type=bind,target=.,rw <<EOT
set -e
git add -A
cp -rf /out/* .
diff=$(git status --porcelain -- dist)
if [ -n "$diff" ]; then
  echo >&2 'ERROR: Build result differs. Please build first with "docker buildx bake build"'
  echo "$diff"
  exit 1
fi
EOT

FROM deps AS format
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules <<EOT
yarn run format
mkdir /out
find . -name '*.ts' -not -path './node_modules/*' | cpio -pdm /out
EOT

FROM scratch AS format-update
COPY --from=format /out /

FROM deps AS lint
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules \
  yarn run lint

FROM deps AS test
ENV RUNNER_TEMP=/tmp/github_runner
ENV RUNNER_TOOL_CACHE=/tmp/github_tool_cache
RUN --mount=type=bind,target=.,rw \
  --mount=type=cache,target=/src/node_modules \
  yarn run test --coverageDirectory=/tmp/coverage

FROM scratch AS test-coverage
COPY --from=test /tmp/coverage /
