<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, minimum-scale=1.0">
	<link rel="canonical" href="<?php echo get_site_url(); ?>" />
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="stylesheet" id="carpeaqua-typography-css" type="text/css" href="https://cloud.typography.com/7044094/6451752/css/fonts.css" />
	<link rel="stylesheet" id="carpeaqua-bigfoot-css" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/main.css" />
	<link rel="stylesheet" id="carpeaqua-bigfoot-css" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/bigfoot-default.css" />
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/favicon.svg">
	<link rel="apple-touch-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/apple-touch-icon.png">

	<!--  Don't Forget Apple Touch Icon -->
	<!--  Don't Favicon -->
	<!--  Don't Forget OpenGraph -->
	<!--  Don't Forget Twitter -->
	<!--  Don't Forget Slack -->
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
