<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use function file_exists;
use function substr;
use function touch;

#[AsCommand(
    name: 'user:localdb',
    description: 'Create the local user database',
    help: 'bin/console user:localdb',
)]
final class CreateLocalDbCommand extends Command
{
    /**
     * @param string $databaseUrl
     */
    public function __construct(private string $databaseUrl)
    {
        parent::__construct();
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        if (substr($this->databaseUrl, 0, 10) === 'sqlite:///') {
            $this->databaseUrl = substr($this->databaseUrl, 10);
        }
        if (!file_exists($this->databaseUrl)) {
            touch($this->databaseUrl);
        }

        return Command::SUCCESS;
    }
}
