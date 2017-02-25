# carpeaqua-template

The current carpeaqua Wordpress template. If you are looking for a good example of how to build a Wordpress template, this is super not it.

## Requirements

* Bower
* Grunt
* Yarn

## Local Development Instructions

Because I forget this stuff in the 8 months I go between updates.

Then you need to install the development dependencies. I use `yarn`, but you can probably get away with `npm` if you really wanted to.

  yarn

First you need Bower to handle part of this. I install it globally because I am a lazy, lazy developer.

  yarn global add bower
  bower install

So, you want to start updating the template in real time and having your changes update?

  grunt

Easy!

## Deploying

If everything works properly you should be able to deploy the current `master` to your local copy of carpeaqua.

  grunt deploy staging

If you want to deploy to carpeaqua's server, use "production" instead of "staging"

The end.
