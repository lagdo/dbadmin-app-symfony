<?php

namespace DbAdmin\Symfony\Facade;

use Lagdo\Facades\AbstractFacade;
use Lagdo\Facades\ServiceInstance;
use Symfony\Component\Security\Http\Logout\LogoutUrlGenerator as UrlGenerator;

/**
 * @extends AbstractFacade<UrlGenerator>
 */
class LogoutUrlGenerator extends AbstractFacade
{
    use ServiceInstance;

    /**
     * @inheritDoc
     */
    protected static function getServiceIdentifier(): string
    {
        return UrlGenerator::class;
    }
}
