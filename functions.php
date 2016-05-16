<?php
if ( ! function_exists( 'carpeaqua_setup' ) ) :
  function carpeaqua_setup() {
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'title-tag' );
  }
endif; // carpeaqua_setup
add_action( 'after_setup_theme', 'carpeaqua_setup' );
?>
