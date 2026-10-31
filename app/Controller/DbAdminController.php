<?php

namespace DbAdmin\Symfony\Controller;

use DbAdmin\Symfony\Security\DbAuditVoter;
use Jaxon\Symfony\App\Jaxon;
use Lagdo\DbAdmin\App\DbAdminPackage;
use Lagdo\DbAdmin\App\DbAuditPackage;
use Lagdo\DbAdmin\App\Ui\AdminUiBuilder;
use Lagdo\DbAdmin\App\Ui\AuditUiBuilder;
use Lagdo\DbAdmin\Support\Facade\Export;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
    #[Route('/export/{filename}', name: 'dbadmin_file', methods: ['GET'])]
    public function export(string $filename): Response
    {
        $options = Export::options($filename);
        $exports = Export::export($options);
        if ($exports === null) {
            $response = new Response();
            $response->headers->set('Content-Type', 'text/plain');
            return $response->setStatusCode(403)
                ->setContent("Unable to export file $filename.");
        }

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
}
