<?php

namespace App\Command;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Validation\Validator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Exception\RuntimeException;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use function sprintf;

#[AsCommand(
    name: 'user:create',
    description: 'Create a user account',
    help: 'bin/console user:create
        {--name= : The new user name}
        {--email= : The new user email}',
)]
final class CreateUserCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly Validator $validator,
        private readonly UserRepository $users,
    ) {
        parent::__construct();
    }

    /**
     * Configures the current command.
     */
    protected function configure(): void
    {
        $this
            ->addOption('name', 'a', InputOption::VALUE_REQUIRED,
                'The new user full name')
            ->addOption('email', 'm', InputOption::VALUE_REQUIRED,
                'The new user email');
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $name = $input->getOption('name');
        if ($name === null) {
            $name = $io->ask('Enter the new user full name',
                null, $this->validator->validateFullName(...));
        } else {
            $this->validator->validateFullName($name);
        }

        $email = $input->getOption('email');
        if ($email === null) {
            $email = $io->ask('Enter the new user email',
                null, $this->validator->validateEmail(...));
        } else {
            $this->validator->validateEmail($email);
        }

        $plainPassword = $io->askHidden('Enter the new user password',
            $this->validator->validatePassword(...));
        $confirmPassword = $io->askHidden('Confirm the new user password',
            $this->validator->validatePassword(...));
        $this->validator->validatePassword($plainPassword);
        $this->validator->validatePassword($confirmPassword);
        if ($plainPassword !== $confirmPassword) {
            throw new RuntimeException('The password confirmation doesn\'t match.');
        }

        $existingEmail = $this->users->findOneBy(['email' => $email]);
        if (null !== $existingEmail) {
            throw new RuntimeException(sprintf('There is already a user registered with the "%s" email.', $email));
        }

        $user = new User();
        $user->setEmail($email)
            ->setFullName($name)
            ->setRoles([User::ROLE_USER]);
        $hashedPassword = $this->passwordHasher->hashPassword($user, $plainPassword);
        $user->setPassword($hashedPassword);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success(sprintf('%s was successfully created: %s', 'User', $user->getEmail()));

        return Command::SUCCESS;
    }
}
