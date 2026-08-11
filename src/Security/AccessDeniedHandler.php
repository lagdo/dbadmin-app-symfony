<?php

namespace App\Security;

use Jaxon\Symfony\App\Jaxon;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Authorization\AccessDeniedHandlerInterface;
use Twig\Environment as View;

class AccessDeniedHandler implements AccessDeniedHandlerInterface
{
    public function __construct(private Jaxon $jaxon,
        private UrlGeneratorInterface $urlGenerator, private View $view)
    {}

    public function handle(Request $request, AccessDeniedException $accessDeniedException): ?Response
    {
        if ($this->jaxon->canProcessRequest()) {
            // Mark the request.
            $request->attributes->set('_jaxon_error_response', true);

            // Redirect to the same page, so it can be displayed.
            $auditUrl = $this->urlGenerator->generate('dbaudit_page');
            $ajaxResponse = $this->jaxon->ajaxResponse();
            $ajaxResponse->redirect($auditUrl);
            return $this->jaxon->httpResponse();
        }

        $content = $this->view->render('security/403.html.twig');
        return new Response($content, 403);
    }
}
