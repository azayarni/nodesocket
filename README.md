# demo app

This demo webapp demonstrates how to implement realtime location updates with node and sockets.io. Implemented on top of sails.js framework and mongoDB as storage.

***[Live Demo](http://demo-app.mod.bz/) ***

## Installation &nbsp;

Before instalation ensure that node & a mongo oserver are installed and running on localhost

### Install Sails.js, if not installed yet
```sh

$ sudo npm install sails -g
```

### Get the cource code

```sh
$ git clone git@github.com:azayarni/nodesocket.git demo
$ cd ./demo
```

### Run tests with mocha

```sh

$ sudo npm install mocha -g
$ mocha ./tests
```

### Install bower (if not yet) frontend components

```sh

$ sudo npm install bower -g
$ cd ./assets
$ bower install
```

### Start server
```sh
$ cd ..
$ sails lift
```

That's it. Then just go to (http://localhost:1337/) and enjoy the show: open two different windows to see the magic of the socket communication.
