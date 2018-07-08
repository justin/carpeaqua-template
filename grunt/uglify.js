'use strict';

module.exports = {
  plugins: {
    files: {
      'build/js/plugins.min.js': [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bigfoot/dist/bigfoot.js',
      ]
    }
  },
  prism: {
    files: {
      'build/js/prism.min.js': [
        'node_modules/prismjs/prism.js',
        'node_modules/prismjs/components/prism-swift.js',
        'node_modules/prismjs/components/prism-bash.min.js',
        'node_modules/prismjs/components/prism-json.min.js',
      ],
    },
  },
  main: {
    files: {
      'build/js/main.min.js': [
        'assets/js/main.js'
      ]
    }
  }
};
