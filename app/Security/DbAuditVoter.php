<?php

namespace DbAdmin\Symfony\Security;

use Jaxon\Symfony\App\Jaxon;
use Lagdo\DbAdmin\App\DbAuditPackage;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Vote;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

final class DbAuditVoter extends Voter
{
    /**
     * @var string
     */
    public const VIEW = 'audit.view';

    /**
     * @param Jaxon $jaxon
     */
    public function __construct(private readonly Jaxon $jaxon)
    {}

    /**
     * @inheritDoc
     */
    protected function supports(string $attribute, mixed $subject): bool
    {
        return $attribute === self::VIEW;
    }

    /**
     * @inheritDoc
     */
    protected function voteOnAttribute(string $attribute, mixed $subject,
        TokenInterface $token, ?Vote $vote = null): bool
    {
        $user = $token->getUser();
        return $this->jaxon->di()->g(DbAuditPackage::class)
            ->checkAccess($user->getUserIdentifier());
    }
}
