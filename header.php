<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, minimum-scale=1.0">
	<link rel="canonical" href="<?php echo get_site_url(); ?>" />
	<title><?php bloginfo('name'); ?> | <?php is_home() ?: wp_title( '' ); ?></title>
	<link rel="stylesheet" id="carpeaqua-typography-css" type="text/css" href="https://cloud.typography.com/7044094/6451752/css/fonts.css" />
	<link rel="stylesheet" id="carpeaqua-bigfoot-css" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/main.css" />
	<link rel="stylesheet" id="carpeaqua-bigfoot-css" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/bigfoot-default.css" />
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/favicon.svg">
	<link rel="apple-touch-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/apple-touch-icon.png">

	<!--  All Hail Zuck! -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="<?php is_home() ? bloginfo('name') : wp_title( '' ); ?>" />
	<meta property="og:url" content="<?php echo is_single() ? get_permalink() : get_site_url(); ?>" />
	<meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
	<meta property="og:image" content="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/card-image.png" />
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />
	<meta property="og:locale" content="en_US" />

	<!-- All Hail @Jack!  -->
	<meta name="twitter:site" content="@carpeaqua" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@carpeaqua" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<header>
		<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.svg" alt="carpeaqua" id="logo" />
		<!-- <nav id="menu-icon"></nav>
		<section id="navigation">
			<nav id="navigation-list">
				<a href="#">About</a>
				<a href="#">Books</a>
				<a href="#">Contact</a>
			</ul>
		</section> -->
	</header>
	<main>
