<?php

return [
    /*
     * An auth service defined in services/auth.php.
     */
    // 'auth' => null, // No auth.
    'auth' => 'default',

    /*
     * An export service defined in services/export.php.
     */
    // 'export' => null, // No export.
    'export' => 'default',

    /*
     * A secret service defined in services/secret.php.
     * infisical, aws-secret, gcp-secret, openbao, or azure-vault.
     */
    // Comment to use the default secret config provider, which reads secret from the .env.dbadmin file.
    // 'secret' => 'infisical',

    'ui' => [
        /*
         * A template service defined in services/template.php.
         * - sb-admin: SB Admin template: https://startbootstrap.com/template/sb-admin
         * - plain-admin: Plain Admin template: https://plainadmin.com
         * - coreui5: CoreUI 5 template: https://coreui.io/product/free-bootstrap-admin-template
         * - bulma: Bulma Admin One template: https://github.com/vikdiesel/admin-one-bulma-dashboard
         */
        'template' => 'bulma',
        'assets' => [
            'url' => '/dbadmin',
        ],
        'query' => [
            // 'cm' for CodeMirror or 'ace' for Ace Editor.
            'editor' => 'cm',
        ],
    ],

    /*
     * The audit logging options.
     */
    'audit' => [
        'enabled' => false,
        'users' => [
            // The emails of users that are allowed to access the audit page.
        ],
        'database' => [
            // Same as the "servers" items, but "name" is the database name.
        ],
        'queries' => [
            'pagination' => [
                'limit' => 10,
            ],
        ],
    ],
];
