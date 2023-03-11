#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER citycentre;
    CREATE DATABASE citycentre ENCODING UTF8;
    GRANT ALL PRIVILEGES ON DATABASE citycentre TO citycentre;

    ALTER USER citycentre WITH PASSWORD 'password';
    ALTER USER citycentre WITH SUPERUSER;
EOSQL
