'use strict';

module.exports = {
  options: {
    src: "./",
    args: ["--verbose"],
    exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', 'Gemfile', 'yarn.lock', '.bundle', 'script', '.jshintrc', 'Brewfile', 'Gemfile.lock'],
    recursive: true,
    syncDestIgnoreExcl: true
  },
  staging: {
    options: {
      dest: "server/content/themes/carpeaqua-2017/"
    }
  }
};
