<?php

function env(string $name, mixed $default = null): mixed
{
    return $_ENV[$name] ?? $default;
}
