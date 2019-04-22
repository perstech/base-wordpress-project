<?php

include __DIR__. '/inc/custom-post-types.php';
include __DIR__. '/inc/custom-fields.php';


add_theme_support( 'post-thumbnails' );

function custom_setup_theme() {
    add_image_size('post', 500, 600, true);
}
add_action('after_setup_theme', 'custom_setup_theme');


function dd($dumpValue) {
    var_dump($dumpValue);
    exit;
}


function get_related_posts($post_id, $total = 3) {
    $categories = wp_get_post_categories($post_id);
    if ($categories) {
        $categories_ids = $categories;
        $args = array(
            'categories__in'    => array($categories_ids),
            'post__not_in'    => array($post_id),
            'posts_per_page'  => $total,
            'caller_get_posts'=> 1,
        );
        $posts = new WP_Query($args);
        return $posts;
    }
}