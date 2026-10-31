<?php

return [
    'common' => [
        'access' => [
            'server' => true,
            'system' => false,
        ],
        'queries' => [
            'save' => [
                'editor' => false,
                'builder' => false,
                'library' => false,
            ],
            'show' => [
                'preferences' => false,
                'history' => false,
                'favorite' => false,
            ],
            'history' => [
                'distinct' => false,
                'limit' => 10,
            ],
            'favorite' => [
                'limit' => 10,
            ],
        ],
    ],
    'fallback' => [
        'default' => '',
        'servers' => [
            // The database servers
        ],
    ],
];
