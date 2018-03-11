'use strict';

module.exports = {
  main: {
    options: {
      archive: "/Users/justin/Desktop/carpeaqua-2017.zip"
    },
    files: [{
      src: [
        './assets/**/*',
        'default.hbs',
        'error.hbs',
        'index.hbs',
        'package.json',
        './partials/**/*',
        'post.hbs',
      ]
    }]
  }
};
