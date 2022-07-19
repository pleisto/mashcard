# Stage 1: Prepare the dependency files (so we can utilite docker cache to speed up the build)
FROM ghcr.io/pleisto/ruby-3:latest as base

# RUN with pipe recommendation: https://github.com/hadolint/hadolint/wiki/DL4006
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
WORKDIR /app

RUN --mount=type=bind,target=/docker-context \
  cd /docker-context && \
  find . -name package.json -exec cp --parents {} /app/ \; && \
  cp -rf yarn.lock .yarnrc.yml .yarn .cargo .ruby-version /app && \
  mkdir -p /app/packages/dev-support && cp -rf packages/dev-support/src /app/packages/dev-support && \
  mkdir -p /bundle/apps/server-monolith && mkdir -p /cargo/apps/server-monolith && \
  find . \( -name Gemfile -o -name Rakefile \) -exec cp --parents {} /bundle/ \; && \
  cd apps/server-monolith && \
  cp Gemfile.lock /bundle/apps/server-monolith && \
  cp Cargo.toml /cargo/apps/server-monolith && \
  cp Cargo.lock /cargo/apps/server-monolith && \
  cp -rf ext /cargo/apps/server-monolith

# Stage 2: Install dependencies and build the app
FROM ghcr.io/pleisto/ruby-3:latest as builder

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
WORKDIR /app

RUN apt-get update && apt-get install -y git build-essential && \
  curl https://get.volta.sh | bash && \
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --default-toolchain stable -y

ARG RAILS_ENV=production
ENV RAILS_ENV=$RAILS_ENV
ENV NODE_OPTIONS=--max-old-space-size=6457
ENV PATH /root/.volta/bin:/root/.cargo/bin:$PATH
ENV CI=1

COPY --from=base /bundle .
RUN cd ./apps/server-monolith/ && bundle install --retry 2 --jobs 4

COPY --from=base /cargo .
RUN cd ./apps/server-monolith/ && rake rust:build

COPY --from=base /app .
RUN yarn install --immutable

ARG VERSION=0.0.0
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT

COPY . .

RUN sed -i "s/[\"]version[\"]: [\"]0.0.0[\"]/\"version\": \"$VERSION\"/g" package.json && \
  yarn dev-support vite build

# TODO: upload sourcemap to Sentry for SaaS deployments
# RUN if [ "$VERSION" != "0.0.0" ] && [ "$SENTRY_AUTH_TOKEN" ]; then yarn sentry-cli releases files mashcard@$VERSION upload-sourcemaps ./apps/server-monolith/public/esm-bundle --url-prefix '~/esm-bundle'; fi

RUN rm -rf node_modules .yarn apps/client-web dist yarn.lock \
  && find . -name 'node_modules' -type d -prune -exec rm -rf '{}' + \
  && rm -rf ./packages ./tools && rm -rf ./apps/server-monolith/ext && rm -rf ./apps/server-monolith/target

# Stage 3: Copy minimum runtime-needed files to the final image
FROM ghcr.io/pleisto/ruby-3:latest

WORKDIR /app

LABEL org.opencontainers.image.authors="secure@pleisto.com"
LABEL org.opencontainers.image.source="https://github.com/mashcard/mashcard"

ARG RAILS_ENV=production
ENV RAILS_ENV=$RAILS_ENV
ENV BUNDLE_WITHOUT="test development"
COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY --from=builder /app .

WORKDIR /app/apps/server-monolith
EXPOSE 3036
ENTRYPOINT ["bundle", "exec" ,"pumactl", "-F" ,"/app/apps/server-monolith/config/puma.rb", "start"]
