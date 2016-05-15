<?php get_header(); ?>
		<?php if ( have_posts() ) : ?>
			<?php
			while ( have_posts() ) : the_post();
				get_template_part( 'template-parts/content', get_post_format() );
			endwhile;
		endif;
		?>
<?php get_footer(); ?>
