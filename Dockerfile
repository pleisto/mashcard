ARG RAILS_ENV=production
FROM ghcr.io/brickdoc/ruby-3:latest as builder

# RUN with pipe recommendation: https://github.com/hadolint/hadolint/wiki/DL4006
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Add NodeJS & PostgreSQL apt sources.
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install --no-install-recommends -y nodejs build-essential && npm install -g yarn

ARG RAILS_ENV
ENV RAILS_ENV=${RAILS_ENV}
ENV BUNDLE_WITHOUT="test development"
COPY . /app
WORKDIR /app

RUN bundle install --retry 2 --jobs 4 \
  && yarn install --immutable \
  && yarn dist && rm -rf node_modules .git .yarn frontends dist public/esm-bundle/stats.json *.js *.json *.yml yarn.lock \
  # Remove ./packages without local gems
  && find ./packages/* -maxdepth 0 -type d | \
  # TODO: we should separate the gem packages from npm packages in the future to avoid listing all gem package names here.
  grep -v 'brickdoc_settings' | \
  grep -v 'rubocop-brickdoc' | \
  xargs rm -rf \
  && mkdir mkdir tmp && mkdir tmp/pids


FROM ghcr.io/brickdoc/ruby-3:latest
LABEL org.opencontainers.iamge.authors="secure@brickdoc.com"
LABEL org.opencontainers.image.licenses = "Apache-2.0"
LABEL org.opencontainers.image.source = "https://github.com/brickdoc/brickdoc"
COPY --from=builder /app /app

ARG RAILS_ENV
ENV RAILS_ENV=$RAILS_ENV
ENV RAILS_SERVE_STATIC_FILES=true

EXPOSE 3000
WORKDIR /app
ENTRYPOINT ["bundle", "exec" ,"pumactl", "-F" ,"/app/config/puma.rb", "start"]
