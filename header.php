<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, minimum-scale=1.0">
	<link rel="canonical" href="<?php echo get_site_url(); ?>" />
	<link rel="stylesheet" id="carpeaqua-typography-css" type="text/css" href="https://cloud.typography.com/7044094/6451752/css/fonts.css" />
	<link rel="stylesheet" id="carpeaqua-bigfoot-css" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/main.css" />
	<link rel="stylesheet" id="carpeaqua-bigfoot-css" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/bigfoot-default.css" />
	<!--  Don't Forget OpenGraph -->
	<!--  Don't Forget Twitter -->
	<!--  Don't Forget Slack -->
	<?php wp_head(); ?>
</head>

<body>
	<header>
		<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo.svg" alt="carpeaqua" id="logo" />
		<nav id="menu-icon"></nav>
		<section id="navigation">
			<nav id="navigation-list">
				<a href="#">About</a>
				<a href="#">Books</a>
				<a href="#">Contact</a>
			</ul>
		</section>
	</header>
	<main>
