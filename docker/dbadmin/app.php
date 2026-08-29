<?php

use DbAdmin\Symfony\Facade\LogoutUrlGenerator;
use DbAdmin\Symfony\Facade\Security;
use DbAdmin\Symfony\Facade\UrlGenerator;
use Lagdo\DbAdmin\Support\Facade\Auth;
use Lagdo\DbAdmin\Support\Provider;
use Lagdo\DbAdmin\Support\Service;
use Symfony\Component\String\Slugger\AsciiSlugger;

return [
    'ui' => [
        'template' => 'bootstrap5',
        'assets' => [
            'url' => '/dbadmin',
        ],
        'toast' => [
            'lib' => 'butterup',
        ],
        'query' => [
            // 'cm' for CodeMirror or 'ace' for Ace Editor.
            'editor' => 'cm',
        ],
    ],
    'admin' => [
        'queries' => [
            'save' => [
                'editor' => false,
                'builder' => false,
                'library' => false,
            ],
            'show' => [
                'preferences' => false,
                'history' => false,
                'favorite' => false,
            ],
            'history' => [
                'distinct' => false,
                'limit' => 10,
            ],
            'favorite' => [
                'limit' => 10,
            ],
        ],
    ],
    'audit' => [
        'enabled' => false,
        'users' => [
            // The emails of users that are allowed to access the audit page.
        ],
        'queries' => [
            'database' => [
                // Same as the "servers" items, but "name" is the database name.
                'driver' => 'pgsql',
                'name' => 'auditdb',
                'host' => env('PGSQL17_DB_HOST'),
                'port' => env('PGSQL17_DB_PORT'),
                'username' => env('PGSQL17_DB_USERNAME'),
                'password' => env('PGSQL17_DB_PASSWORD'),
            ],
            'pagination' => [
                'limit' => 10,
            ],
        ],
    ],
    // 'auth' => null, // No auth.
    'auth' => fn() => new class implements Provider\AuthInterface {
        public function userId(): string
        {
            return Security::getUser()->getEmail();
        }
        public function name(): string
        {
            return Security::getUser()->getFullName();
        }
        public function roles(): array
        {
            return Security::getUser()->getRoles();
        }
        public function audit(): string
        {
            return UrlGenerator::generate('dbaudit_page');
        }
        public function logout(): string
        {
            return LogoutUrlGenerator::getLogoutUrl();
        }
    },
    // 'export' => null, // No export.
    'export' => fn() => new class extends Service\Export\AbstractFileSystem {
        protected function storage(): string
        {
            return 'exports';
        }
        protected function path(string $filename): string
        {
            // Use the slugified username to customize the path.
            $userId = Auth::userId();
            $userDir = $userId === '' ? 'users' : 'users/' .
                strtolower((new AsciiSlugger())->slug($userId));
            return "$userDir/$filename";
        }
        protected function url(string $filename): string
        {
            return UrlGenerator::generate('export_file', ['filename' => $filename]);
        }
    },
    // Comment all to use the default secret config provider, which reads secret from the .env.dbadmin file.
    'secret' => [
        // 'reader' => Provider\Secret\InfisicalConfigProvider::class,
        // 'key' => fn() => new class implements Provider\Secret\KeyBuilderInterface {
        //     public function build(string $prefix, string $option = ''): string
        //     {
        //         // $username = Auth::userId(); // Use this to customize the key.
        //         return "users.{$prefix}.{$option}";
        //     }
        // },
        // 'reader' => Provider\Secret\AwsSecretConfigProvider::class,
        // 'key' => fn() => new class implements Provider\Secret\KeyBuilderInterface {
        //     public function build(string $prefix, string $option = ''): string
        //     {
        //         // $username = Auth::userId(); // Use this to customize the key.
        //         // User names and passwords are stored in the same entries.
        //         return "users.{$prefix}";
        //     }
        // },
        // 'reader' => Provider\Secret\GcpSecretConfigProvider::class,
        // 'key' => fn() => new class implements Provider\Secret\KeyBuilderInterface {
        //     public function build(string $prefix, string $option = ''): string
        //     {
        //         // $username = Auth::userId(); // Use this to customize the key.
        //         return "db.users.{$prefix}.{$option}";
        //     }
        // },
        // 'reader' => Provider\Secret\OpenBaoConfigProvider::class,
        // 'key' => fn() => new class implements Provider\Secret\KeyBuilderInterface {
        //     public function build(string $prefix, string $option = ''): string
        //     {
        //         // $username = Auth::userId(); // Use this to customize the key.
        //         // The key is prefixed with "data/", for the KV2 API.
        //         return "data/db.users.{$prefix}.{$option}";
        //     }
        // },
    ],
];
