# clock-helper-cli

[![npm version](https://img.shields.io/npm/v/clock-helper-cli.svg)](https://www.npmjs.com/package/clock-helper-cli)

> A clock helper for querying the time of startup and shutdown

## Installation

```sh
$ npm install clock-helper-cli
```

## Usage

```sh
$ clock-helper --help

  Usage
    $ clock-helper

  Options
    --startup   Only show the timeline of system startup
    --shutdown  Only show the timeline of system shutdown
    --desc      Sort the timeline in descending order

  Example
    $ clock-helper
    $ clock-helper --startup
    $ clock-helper --shutdown
    $ clock-helper --desc

$ clock-helper

Startup history:
2020-01-31 19:31:00
2020-02-02 16:49:00
2020-02-02 17:18:00
2020-02-02 21:12:00
2020-02-04 09:16:00
2020-02-08 20:30:00

Shutdown history:
2020-02-02 17:18:00
2020-02-02 21:10:00
2020-02-03 23:22:00
```

## License

MIT © Qingrong Ke
