<?php

namespace DbAdmin\Symfony\Controller;

use DbAdmin\Symfony\Security\DbAuditVoter;
use Jaxon\Symfony\App\Jaxon;
use Lagdo\DbAdmin\App\DbAdminPackage;
use Lagdo\DbAdmin\App\DbAuditPackage;
use Lagdo\DbAdmin\App\Ui\AdminUiBuilder;
use Lagdo\DbAdmin\App\Ui\AuditUiBuilder;
use Lagdo\DbAdmin\Support\Service\Export\ExportService;
use Lagdo\DbAdmin\Support\Service\Import\ImportService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

use function flush;
use function ob_flush;
use function ob_get_level;

class DbAdminController extends AbstractController
{
    #[IsGranted('ROLE_USER')]
    #[Route('/', name: 'dbadmin_page', methods: ['GET'])]
    public function home(Jaxon $jaxon): Response
    {
        return $this->render('@dbadmin/dbadmin.html.twig', [
            'di' => $jaxon->di(),
            'ui' => AdminUiBuilder::class,
            'package' => DbAdminPackage::class,
        ]);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/jaxon', name: 'dbadmin_ajax', methods: ['POST'])]
    public function adminAjax(Jaxon $jaxon): Response
    {
        return $jaxon->processRequest();
    }

    #[IsGranted('ROLE_USER')]
    #[IsGranted(DbAuditVoter::VIEW)]
    public function audit(Jaxon $jaxon): Response
    {
        return $this->render('@dbadmin/dbaudit.html.twig', [
            'di' => $jaxon->di(),
            'ui' => AuditUiBuilder::class,
            'package' => DbAuditPackage::class,
        ]);
    }

    #[IsGranted('ROLE_USER')]
    #[IsGranted(DbAuditVoter::VIEW)]
    public function auditAjax(Jaxon $jaxon): Response
    {
        return $jaxon->processRequest();
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/export/{filename}', name: 'dbadmin_export', methods: ['GET'])]
    public function export(Request $request, ExportService $service, string $filename): Response
    {
        $options = $service->options($filename, ['timeLimit' => 0]);
        $exports = $options === null ? null : $service->export($options);
        if ($exports === null) {
            $response = new Response();
            $response->headers->set('Content-Type', 'text/plain');
            return $response->setStatusCode(403)
                ->setContent("Unable to export file $filename.");
        }

        // Unlock the session before starting the streaming.
        $request->getSession()->save();

        $response = new StreamedResponse(function() use($exports) {
            foreach ($exports as $export) {
                echo $export;
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            }
        });

        $response->headers->set('Content-Type', $options->contentType());
        $response->headers->set('Content-Disposition', $options->contentDisposition());
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');
        $response->headers->set('X-Accel-Buffering', 'no');

        return $response;
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/import/{filename}', name: 'dbadmin_import', methods: ['GET'])]
    public function import(Request $request, ImportService $service, string $filename): Response
    {
        $options = $service->options($filename, ['timeLimit' => 0]);
        $imports = $options === null ? null : $service->import($options);
        if ($imports === null) {
            $response = new Response();
            $response->headers->set('Content-Type', 'text/plain');
            return $response->setStatusCode(403)
                ->setContent("Unable to import file $filename.");
        }

        // Unlock the session before starting the streaming.
        $request->getSession()->save();

        $response = new StreamedResponse(function() use($imports) {
            foreach ($imports as $import) {
                echo $import;
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            }
        });

        $response->headers->set('Content-Type', $options->contentType());
        $response->headers->set('Content-Disposition', $options->contentDisposition());
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');
        $response->headers->set('X-Accel-Buffering', 'no');

        return $response;
    }
}
