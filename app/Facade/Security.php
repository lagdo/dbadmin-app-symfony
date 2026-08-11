<?php

namespace DbAdmin\Symfony\Facade;

use Symfony\Bundle\SecurityBundle\Security as AppSecurity;
use Lagdo\Facades\AbstractFacade;
use Lagdo\Facades\ServiceInstance;

/**
 * @extends AbstractFacade<AppSecurity>
 */
class Security extends AbstractFacade
{
    use ServiceInstance;

    /**
     * @inheritDoc
     */
    protected static function getServiceIdentifier(): string
    {
        return AppSecurity::class;
    }
}
