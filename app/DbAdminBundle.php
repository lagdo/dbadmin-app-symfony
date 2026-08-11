<?php

namespace DbAdmin\Symfony;

use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;

class DbAdminBundle extends AbstractBundle
{
    /**
     * @inheritDoc
     */
    public function getContainerExtension(): ?ExtensionInterface
    {
        return new DependencyInjection\DbAdminExtension();
    }
}
