# carpeaqua-template

The current carpeaqua Ghost template. If you are looking for a good example of how to build a Ghost template, this is super not it.

## Requirements

* Grunt
* Yarn

## Local Development Instructions

Because I forget this stuff in the 8 months I go between updates.

    ./script/setup

So, you want to start updating the template in real time and having your changes update?

    grunt

Easy!

## Deploying

If everything works properly you should be able to deploy the current `master` to your local copy of carpeaqua.

    grunt deploy:staging

If you want to deploy to carpeaqua's server, do this instead:

    grunt deploy:production

The end.
