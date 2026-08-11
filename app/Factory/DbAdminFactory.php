<?php

namespace DbAdmin\Symfony\Factory;

use Lagdo\DbAdmin\Driver\Utils\TranslatorInterface;
use Lagdo\DbAdmin\Support\Provider\AuthInterface;

use function Jaxon\jaxon;

/**
 * Factory to import services defined in the Jaxon DI container into the Symfony container.
 */
class DbAdminFactory
{
    /**
     * @return AuthInterface
     */
    public static function auth(): AuthInterface
    {
        return jaxon()->di()->g(AuthInterface::class);
    }

    /**
     * @return TranslatorInterface
     */
    public static function trans(): TranslatorInterface
    {
        return jaxon()->di()->g(TranslatorInterface::class);
    }
}
