ARG DBADMIN_VERSION=0.11.0

# Root builder
FROM lagdo/alpine-php-free-unit

ARG DBADMIN_VERSION
ARG PHP_USER
ARG PHP_UID
ARG PHP_GID
ENV PHP_USER=${PHP_USER}
ENV PHP_UID=${PHP_UID}
ENV PHP_GID=${PHP_GID}

RUN install-php-extensions pdo pdo_sqlite sqlite3 pdo_mysql mysqlnd mysqli pdo_pgsql pgsql

# Configure Free Unit
COPY docker/unit/config.json /docker-entrypoint.d/config.json

# App root
COPY . /var/www

RUN addgroup -g ${PHP_GID} --system ${PHP_USER} && \
  adduser -G ${PHP_USER} --system -D -s /bin/sh -u ${PHP_UID} ${PHP_USER} && \
  touch /var/run/unit.pid && \
  touch /var/log/unit.log && \
  mkdir -p /usr/local/var && \
  chown -R ${PHP_USER}:${PHP_USER} /usr/local/var /var/www /var/run /var/log /run

USER ${PHP_USER}

# Install Composer packages
RUN cd /var/www && \
    cp .env.docker .env && \
    composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader

WORKDIR /var/www
EXPOSE 8080

LABEL maintainer="Thierry Feuzeu <thierry.feuzeu@gmail.com>" \
  org.opencontainers.image.source="https://github.com/lagdo/dbadmin-app" \
  org.opencontainers.image.description="Jaxon DbAdmin: a web-based database management tool." \
  org.opencontainers.image.licenses="BSD 3-Clause" \
  org.opencontainers.image.version="${DBADMIN_VERSION}"
