<?php

namespace DbAdmin\Symfony\Routing;

use DbAdmin\Symfony\Controller\DbAdminController;
use Symfony\Component\Config\Loader\Loader;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

final class DbAuditRouteLoader extends Loader
{
    /**
     * @param mixed $resource
     * @param string $type
     *
     * @return RouteCollection
     */
    public function load(mixed $resource, ?string $type = null): RouteCollection
    {
        $routes = new RouteCollection();
        $routes->add('dbaudit_page', new Route('/audit', [
            '_controller' => DbAdminController::class . '::audit',
        ]));
        $routes->add('dbaudit_ajax', new Route('/audit/jaxon', [
            '_controller' => DbAdminController::class . '::auditAjax',
        ], methods: ['POST']));

        return $routes;
    }

    /**
     * @param mixed $resource
     * @param string $type
     *
     * @return bool
     */
    public function supports(mixed $resource, ?string $type = null): bool
    {
        return $type === 'dbaudit';
    }
}
