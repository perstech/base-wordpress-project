<?php


function custom_post_type()
{

    register_post_type( 'citacao', array(
            'labels' => array(
                'name' => 'Citações',
                'singular_name' => 'Citações'
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'thumbnail', 'excerpt', 'editor')
        )
    );


}

add_action('init', 'custom_post_type');