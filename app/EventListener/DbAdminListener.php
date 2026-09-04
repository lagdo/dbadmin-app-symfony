<?php

namespace DbAdmin\Symfony\EventListener;

use Jaxon\App\I18n\Translator;
use Jaxon\Exception\Exception as JaxonException;
use Jaxon\Symfony\App\Jaxon;
use Lagdo\DbAdmin\App\Ajax\Exception\AppException;
use Lagdo\DbAdmin\App\Ajax\Exception\ValidationException;
use Lagdo\DbAdmin\App\DbAdminPackage;
use Lagdo\DbAdmin\App\DbAuditPackage;
use Lagdo\DbAdmin\Driver\Exception\DriverException;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class DbAdminListener
{
    /**
     * @param Jaxon $jaxon
     * @param string $projectDir
     */
    public function __construct(private Jaxon $jaxon, private string $projectDir)
    {}

    /**
     * @param RequestEvent $event
     *
     * @return void
     */
    #[AsEventListener]
    public function onRequest(RequestEvent $event): void
    {
        $dotenv = new Dotenv();
        // Load the custom env file
        $dotenv->load("{$this->projectDir}/.env.dbadmin");
    }

    /**
     * @param ControllerEvent $event
     *
     * @return void
     */
    #[AsEventListener]
    public function onKernelController(ControllerEvent $event): void
    {
        $request = $event->getRequest();
        $route = $request->attributes->get('_route');
        switch($route) {
            case 'dbadmin_page':
            case 'dbadmin_ajax':
            case 'dbadmin_file':
                // Register the DbAdmin package.
                $configDir = "{$this->projectDir}/config/dbadmin";
                DbAdminPackage::register($configDir, '/jaxon');
                break;
            case 'dbaudit_page':
            case 'dbaudit_ajax':
                // Register the DbAudit package.
                $configDir = "{$this->projectDir}/config/dbadmin";
                DbAuditPackage::register($configDir, '/audit/jaxon');
                break;
            default: // Nothing to do.
        }
    }

    /**
     * @param string $message
     * @param bool $isError
     *
     * @return Response
     */
    private function showMessage(string $message, bool $isError): Response
    {
        $trans = $this->jaxon->di()->g(Translator::class);
        $ajaxResponse = $this->jaxon->ajaxResponse();

        $messageType = $isError ? 'error' : 'warning';
        $messageTitle = $isError ? $trans->trans('Error') : $trans->trans('Warning');
        $ajaxResponse->dialog->title($messageTitle)->$messageType($message);

        return $this->jaxon->httpResponse();
    }

    /**
     * @param string $errorMessage
     *
     * @return Response
     */
    private function exceptionMessage(string $errorMessage): Response
    {
        $message = 'Unable to process the request. Unexpected error.';
        // Also show the exception message in debug env.
        if (env('APP_DEBUG', false)) {
            $message .= ' ' . $errorMessage;
        }
        return $this->showMessage($message, true);
    }

    /**
     * @param ExceptionEvent $event
     *
     * @return void
     */
    #[AsEventListener]
    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $errorMessage = $exception->getMessage();
        $response = match(true) {
            !$this->jaxon->canProcessRequest() => null,
            $exception instanceof AppException => $this->showMessage($errorMessage, false),
            $exception instanceof ValidationException => $this->showMessage($errorMessage, false),
            $exception instanceof DriverException => $this->showMessage($errorMessage, true),
            $exception instanceof JaxonException => $this->showMessage($errorMessage, true),
            default => $this->exceptionMessage($errorMessage),
        };
        if ($response !== null) {
            $event->setResponse($response);
            // Mark the request.
            $request = $event->getRequest();
            $request->attributes->set('_jaxon_error_response', true);
        }
    }

    /**
     * @param ResponseEvent $event
     *
     * @return void
     */
    #[AsEventListener]
    public function onResponse(ResponseEvent $event): void
    {
        // Check if the request is marked, and return back the status code to 200.
        $request = $event->getRequest();
        $response = $event->getResponse();
        if ($response->getStatusCode() > 399 &&
            $request->attributes->has('_jaxon_error_response')) {
            $newResponse = new Response($event->getResponse()->getContent(), 200);
            $event->setResponse($newResponse);
        }
    }
}
