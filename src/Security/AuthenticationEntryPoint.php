<?php

namespace App\Security;

use Jaxon\Symfony\App\Jaxon;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;

class AuthenticationEntryPoint implements AuthenticationEntryPointInterface
{
    public function __construct(private Jaxon $jaxon,
        private UrlGeneratorInterface $urlGenerator)
    {}

    public function start(Request $request, ?AuthenticationException $authException = null): Response
    {
        // add a custom flash message and redirect to the login page
        $request->getSession()->getFlashBag()
            ->add('note', 'You have to log in to access this page.');

        $loginUrl = $this->urlGenerator->generate('app_login');
        if ($this->jaxon->canProcessRequest()) {
            // Mark the request.
            $request->attributes->set('_jaxon_error_response', true);

            // Redirect with the Ajax response.
            $ajaxResponse = $this->jaxon->ajaxResponse();
            $ajaxResponse->redirect($loginUrl);
            return $this->jaxon->httpResponse();
        }

        // Redirect with the HTTP response.
        return new RedirectResponse($loginUrl);
    }
}
