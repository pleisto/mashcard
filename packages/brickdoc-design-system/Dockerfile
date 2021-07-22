FROM node:16 as build
WORKDIR /app
ADD . /app
RUN yarn install && yarn build-storybook --docs

FROM ghcr.io/brickdoc/wrapdrive:latest
LABEL org.opencontainers.iamge.authors="secure@brickdoc.com"
LABEL org.opencontainers.image.licenses = "Apache-2.0"
LABEL org.opencontainers.image.source = "https://github.com/brickdoc/brickdoc"
LABEL org.opencontainers.image.documentation = "https://github.com/brickdoc/brickdoc/blob/master/packages/brickdoc-design-system/README.md"
COPY --from=build /app/storybook-static /var/www/html
CMD ["/wrapdrive"]
