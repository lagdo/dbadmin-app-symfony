<?php

namespace DbAdmin\Symfony\Controller;

use DbAdmin\Symfony\Security\DbAuditVoter;
use Jaxon\Symfony\App\Jaxon;
use Lagdo\DbAdmin\App\DbAdminPackage;
use Lagdo\DbAdmin\App\DbAuditPackage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

use function is_callable;

class DbAdminController extends AbstractController
{
    #[IsGranted('ROLE_USER')]
    #[Route('/', name: 'dbadmin_page', methods: ['GET'])]
    public function home(Jaxon $jaxon): Response
    {
        return $this->render('dbadmin.html.twig', [
            'jaxon' => $jaxon,
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
        return $this->render('dbaudit.html.twig', [
            'jaxon' => $jaxon,
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
    #[Route('/export/{filename}', name: 'export_file', methods: ['GET'])]
    public function export(Jaxon $jaxon, string $filename): Response
    {
        $reader = $jaxon->package(DbAdminPackage::class)->getOption('export.reader');
        $content = !is_callable($reader) ? "No export reader set." : $reader($filename);

        $response = new Response();
        $response->headers->set('Content-Type', 'text/plain');
        $response->setStatusCode(is_callable($reader) ? 200 : 403);
        $response->setContent($content);
        return $response;
    }
}
