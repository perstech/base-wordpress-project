<?php


// Register Custom Taxonomy
register_post_type( 'test-taxonomie', array(
        'labels' => array(
            'name' => 'Revistas',
            'singular_name' => 'Revista'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'thumbnail', 'excerpt', 'editor')
    )
);