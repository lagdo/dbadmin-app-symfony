# A web-based database management tool

**Jaxon DbAdmin is a database admin dashboard with multiple DBMS support, and a custom and extensible authentication system.**

---

## About Jaxon DbAdmin

Jaxon DbAdmin is a complete rewrite of [Adminer](https://github.com/vrana/adminer), the popular database admin dashboard.

Jaxon DbAdmin is a [Jaxon package](https://www.jaxon-php.org/docs/v5x/extensions/packages.html), that is inserted into a page of an existing PHP application.
So it's also a single page application, and all its operations are performed with Ajax requests.

Separate packages provide ready-to-use applications which run Jaxon DbAdmin respectively with the [Laravel](https://github.com/lagdo/dbadmin-app-laravel), [Symfony](https://github.com/lagdo/dbadmin-app-symfony) and [Slim](https://github.com/lagdo/dbadmin-app-slim) frameworks.
This blog post on the Jaxon website explains how to install Jaxon DbAdmin on [Backpack](https://backpackforlaravel.com), a Laravel-based admin panel: [https://www.jaxon-php.org/blog/2025/07/install-jaxon-dbadmin-on-backpack.html](https://www.jaxon-php.org/blog/2025/07/install-jaxon-dbadmin-on-backpack.html).

The database access code (and thus the provided features) originates from [Adminer](https://github.com/vrana/adminer).
The original code was refactored to take advantage of the latest PHP features (namespaces, interfaces, DI, and so on), and separated into multiple Composer packages.
- [https://github.com/lagdo/dbadmin-driver](https://github.com/lagdo/dbadmin-driver): common classes and interfaces for the database drivers.
- [https://github.com/lagdo/dbadmin-driver-pgsql](https://github.com/lagdo/dbadmin-driver-pgsql): the database driver for PostgreSQL.
- [https://github.com/lagdo/dbadmin-driver-mysql](https://github.com/lagdo/dbadmin-driver-mysql): the database driver for MySQL and MariaDB.
- [https://github.com/lagdo/dbadmin-driver-sqlite](https://github.com/lagdo/dbadmin-driver-sqlite): the database driver for SQLite.

The [https://github.com/lagdo/jaxon-dbadmin](https://github.com/lagdo/jaxon-dbadmin) package implements the database management features in a [Jaxon package](https://www.jaxon-php.org/docs/v5x/extensions/packages.html).
Its UI is built with the [https://github.com/lagdo/ui-builder](https://github.com/lagdo/ui-builder) package, which will provide support for multiple frontend frameworks.
[Bootstrap 5](https://github.com/lagdo/ui-builder-bootstrap5) is the default.

This repo is the monorepo where the database packages are developed.

## Features and current status

Jaxon DbAdmin currently implements the following features:

- Browse servers and databases in multiple tabs.
- Open the query editor in multiple tabs, with query text retention.
- Save the current tabs in user preferences.
- Save and show the query history.
- Save queries in user favorites.
- Read database credentials with an extensible config reader.
- Read database credentials from a secret manager. Currently supported:
  - [Infisical](https://infisical.com/)
  - [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
  - [GCP Secret Manager](https://cloud.google.com/security/products/secret-manager)
  - [OpenBao](https://openbao.org) (compatible with [HashiCorp Vault](https://www.hashicorp.com/fr/products/vault))
- Show tables and views details.
- Query a table.
- Query a view.
- Execute queries in the query editor.
- Support Ace and CodeMirror as SQL editors (chosen in config).
- Import or export data.
- Insert, modify or delete data in a table.
- Create or drop a database.
- Create or alter a table or view.
- Drop a table or view.
- Code completion for table and field names in the SQL editor.
- Navigate through related tables.
- Save the executed queries in an audit logs database.
- Show the audit logs in a dedicated page, with limited access.

The following features are planned for future releases:

- An advanced GUI-based query builder.
- Automated tests.
- Advanced SQL edition and code completion with the Ace linters
  - https://github.com/mkslanc/ace-linters
  - https://www.npmjs.com/package/ace-sql-linter
- Provide a WebAwesome based UI template
- Provide TailwindCSS based UI templates.
- Use an advanced UI component for HTML tables.
- Save and display more data in the audit logs.

Documentation and howtos
------------------------

The [documentation](https://github.com/lagdo/jaxon-dbadmin/wiki) is available online.

## License

BSD 3-Clause License - feel free to use, modify, and distribute.
