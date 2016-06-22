<article class="post standard" id="post-<?php the_ID(); ?>">

  <div id="post-title">
      <?php the_title( sprintf( '<h1><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>
      <time datetime="<?php the_time('c') ?>"><?php the_time('F jS, Y') ?></time>
  </div>

	<?php the_content(); ?>
</article>
