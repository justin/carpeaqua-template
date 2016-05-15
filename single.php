<?php get_header(); ?>

<?php
// Start the loop.
while ( have_posts() ) : the_post();
	get_template_part( 'template-parts/content', 'single' );

	// if ( comments_open() || get_comments_number() ) {
	// 	comments_template();
	// }
endwhile;
?>
<?php get_footer(); ?>
