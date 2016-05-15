<article class="post standard" id="post-<?php the_ID(); ?>">

  <div id="post-title">
      <?php the_title( sprintf( '<h1><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>
        <time datetime="2016-05-01T17:15:00.000Z">May 01, 2016</time>
      </div>

		<?php the_content(); ?>
</article>
