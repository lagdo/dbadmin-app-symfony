<?php

namespace DbAdmin\Symfony\Facade;

use Lagdo\Facades\AbstractFacade;
use Lagdo\Facades\ServiceInstance;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * @extends AbstractFacade<UrlGeneratorInterface>
 */
class UrlGenerator extends AbstractFacade
{
    use ServiceInstance;

    /**
     * @inheritDoc
     */
    protected static function getServiceIdentifier(): string
    {
        return UrlGeneratorInterface::class;
    }
}
