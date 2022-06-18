FROM node:16 as build
WORKDIR /app
ENV NODE_OPTIONS=--max-old-space-size=5950
# temp fixed monorepo dependency
ADD ./ /app
RUN yarn install && yarn design-system build-storybook

FROM  ghcr.io/pleisto/wrapdrive:latest
LABEL org.opencontainers.iamge.authors="secure@pleisto.com"
LABEL org.opencontainers.image.licenses = "Apache-2.0"
LABEL org.opencontainers.image.source = "https://github.com/mashcard/mashcard"
LABEL org.opencontainers.image.documentation = "https://github.com/mashcard/mashcard/blob/main/packages/design-system/README.md"
COPY --from=build /app/packages/brickdoc-design-system/storybook-static /var/www/html
CMD ["/wrapdrive"]
