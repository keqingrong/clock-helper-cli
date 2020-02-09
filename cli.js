#!/usr/bin/env node
'use strict';
const meow = require('meow');
const {
  getStartupDateList,
  getShutdownDateList,
} = require('clock-helper');
const { formatDate } = require('clock-helper/lib/utils');

const cli = meow(`
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
`, {
  flags: {
    startup: {
      type: 'boolean',
      default: false
    },
    shutdown: {
      type: 'boolean',
      default: false
    },
    desc: {
      type: 'boolean',
      default: false
    }
  }
});

(async () => {
  try {
    const isFilterOff = (cli.flags.startup === false) && (cli.flags.shutdown === false);

    if (isFilterOff || cli.flags.startup) {
      const startupDateList = await getStartupDateList();
      const startupDateListText = startupDateList
        .sort((a, b) => cli.flags.desc ? (b - a) : a - b)
        .map(item => formatDate(item))
        .join('\n');
      console.log('Startup history:');
      console.log(startupDateListText, '\n');
    }

    if (cli.flags.startup) {
      return;
    }

    if (isFilterOff || cli.flags.shutdown) {
      const shutdownDateList = await getShutdownDateList();
      const shutdownDateListText = shutdownDateList
      .sort((a, b) => cli.flags.desc ? (b - a) : a - b)
      .map(item => formatDate(item))
      .join('\n');
      console.log('Shutdown history:');
      console.log(shutdownDateListText, '\n');
    }
  } catch (err) {
    console.error('clock-helper', err);
  }
})();
