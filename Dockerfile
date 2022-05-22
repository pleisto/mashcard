FROM ghcr.io/brickdoc/ruby-3:latest as builder

# RUN with pipe recommendation: https://github.com/hadolint/hadolint/wiki/DL4006
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
WORKDIR /app

# Add NodeJS & PostgreSQL apt sources.
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install --no-install-recommends -y nodejs build-essential git && npm install -g yarn @sentry/cli

ARG RAILS_ENV=production
ARG VERSION=0.0.0
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG COVERAGE
ENV RAILS_ENV=$RAILS_ENV
ENV GEM_HOME /app/bundle
ENV BUNDLE_APP_CONFIG="$GEM_HOME" \
  BUNDLE_PATH="$GEM_HOME" \
  BUNDLE_WITHOUT="test development"
ENV PATH $GEM_HOME/bin:$PATH
ENV NODE_OPTIONS=--max-old-space-size=5950
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV YARN_CHECKSUM_BEHAVIOR=update

COPY . .
RUN sed -i "s/[\"]version[\"]: [\"]0.0.0[\"]/\"version\": \"$VERSION\"/g" package.json
RUN yarn install --immutable \
  && mkdir -p "$GEM_HOME" && chmod 777 "$GEM_HOME" \
  && yarn server bundle install --retry 2 --jobs 4
RUN cd apps/server-monolith && chmod a+x bin/* && COVERAGE=$COVERAGE NODE_ENV=$RAILS_ENV bin/vite build
RUN if [ "$VERSION" != "0.0.0" ] && [ "$SENTRY_AUTH_TOKEN" ]; then sentry-cli releases files brickdoc@$VERSION upload-sourcemaps ./public/esm-bundle --url-prefix '~/globalcdn/brickdoc-saas-prod/esm-bundle'; fi

RUN rm -rf node_modules .yarn apps/client-web dist apps/server-monolith/public/esm-bundle/stats.json yarn.lock \
  && find . -name 'node_modules' -type d -prune -exec rm -rf '{}' + \
  && rm -rf ./packages/* \
  && mkdir apps/server-monolith/tmp/pids


FROM ghcr.io/brickdoc/ruby-3:latest

WORKDIR /app

LABEL org.opencontainers.image.authors="secure@brickdoc.com"
LABEL org.opencontainers.image.source="https://github.com/brickdoc/brickdoc"

ARG RAILS_ENV=production
ENV RAILS_ENV=$RAILS_ENV
ENV GEM_HOME /app/bundle
ENV BUNDLE_APP_CONFIG="$GEM_HOME" \
  BUNDLE_PATH="$GEM_HOME" \
  BUNDLE_WITHOUT="test development"
ENV PATH $GEM_HOME/bin:$PATH
ENV RAILS_SERVE_STATIC_FILES=true
COPY --from=builder /app .

WORKDIR /app/apps/server-monolith
EXPOSE 3000
ENTRYPOINT ["bundle", "exec" ,"pumactl", "-F" ,"/app/apps/server-monolith/config/puma.rb", "start"]
