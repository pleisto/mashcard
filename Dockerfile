FROM ghcr.io/brickdoc/ruby-3:latest as builder

# RUN with pipe recommendation: https://github.com/hadolint/hadolint/wiki/DL4006
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
WORKDIR /app

# Add NodeJS & PostgreSQL apt sources.
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install --no-install-recommends -y nodejs build-essential && npm install -g yarn

ARG RAILS_ENV=production
ENV RAILS_ENV=$RAILS_ENV
ENV BUNDLE_WITHOUT="test development"
ENV NODE_OPTIONS=--max-old-space-size=5950

COPY . .
RUN bundle install --retry 2 --jobs 4

RUN yarn install --immutable
RUN NODE_ENV=$RAILS_ENV yarn dist
RUN rm -rf node_modules .yarn apps/client-web dist public/esm-bundle/stats.json *.js *.json *.yml yarn.lock \
  && find . -name 'node_modules' -type d -prune -exec rm -rf '{}' + \
  && rm -rf ./packages/* \
  && mkdir tmp/pids


FROM ghcr.io/brickdoc/ruby-3:latest

WORKDIR /app

LABEL org.opencontainers.iamge.authors="secure@brickdoc.com"
LABEL org.opencontainers.image.source="https://github.com/brickdoc/brickdoc"

ARG RAILS_ENV=production
ENV RAILS_ENV=$RAILS_ENV
ENV RAILS_SERVE_STATIC_FILES=true
COPY --from=builder /app .

EXPOSE 3000
ENTRYPOINT ["bundle", "exec" ,"pumactl", "-F" ,"/app/config/puma.rb", "start"]
