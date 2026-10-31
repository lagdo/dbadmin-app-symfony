<?php

use DbAdmin\Symfony\Facade\LogoutUrlGenerator;
use DbAdmin\Symfony\Facade\Security;
use DbAdmin\Symfony\Facade\UrlGenerator;
use Lagdo\DbAdmin\Support\Provider\AuthInterface;

return [
    // 'default' => null, // No auth.
    'default' => fn() => new class implements AuthInterface {
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
];
