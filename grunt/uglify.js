'use strict';

module.exports = {
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
