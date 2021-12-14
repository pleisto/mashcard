FROM node:16 as build
WORKDIR /app
# temp fixed monorepo dependency
ADD ./ /app
RUN yarn install && yarn headless build-storybook

FROM ghcr.io/brickdoc/wrapdrive:latest
LABEL org.opencontainers.iamge.authors="secure@brickdoc.com"
LABEL org.opencontainers.image.licenses = "Apache-2.0"
LABEL org.opencontainers.image.source = "https://github.com/brickdoc/brickdoc"
LABEL org.opencontainers.image.documentation = "https://github.com/brickdoc/brickdoc/blob/master/packages/brickdoc-design-system/README.md"
COPY --from=build /app/packages/brickdoc-headless-design-system/storybook-static /var/www/html
CMD ["/wrapdrive"]
