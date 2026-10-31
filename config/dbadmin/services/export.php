<?php

use DbAdmin\Symfony\Facade\UrlGenerator;
use Lagdo\DbAdmin\Support\Facade\Auth;
use Lagdo\DbAdmin\Support\Service\Export\AbstractFileSystem;
use Symfony\Component\String\Slugger\AsciiSlugger;

return [
    // 'default' => null, // No export.
    'default' => fn() => new class extends AbstractFileSystem {
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
            return UrlGenerator::generate('dbadmin_file', ['filename' => $filename]);
        }
    },
];
