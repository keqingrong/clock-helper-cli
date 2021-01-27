#!/usr/bin/env node
'use strict';
const meow = require('meow');
const { getStartupDateList, getShutdownDateList } = require('clock-helper');
const { formatDate } = require('clock-helper/lib/utils');
const { uniqDateByEarliestTime, uniqDateByLatestTime } = require('./utils');

/**
 * @param {Date[]} dates
 * @returns {Date[]}
 */
const defaultUniq = dates => dates;

const cli = meow(
  `
  Usage
    $ clock-helper

  Options
    --startup   Only show the timeline of system startup
    --shutdown  Only show the timeline of system shutdown
    --desc      Sort the timeline in descending order
    --uniq      Get all unique dates in terms of day by the earliest/latest time

  Example
    $ clock-helper
    $ clock-helper --startup
    $ clock-helper --shutdown
    $ clock-helper --desc
    $ clock-helper --uniq=earliest
    $ clock-helper --uniq=latest
`,
  {
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
      },
      uniq: {
        type: 'string'
      }
    }
  }
);

(async () => {
  try {
    const isFilterOff =
      cli.flags.startup === false && cli.flags.shutdown === false;
    let uniq = defaultUniq;
    switch (cli.flags.uniq) {
      case 'earliest':
        uniq = uniqDateByEarliestTime;
        break;
      case 'latest':
        uniq = uniqDateByLatestTime;
        break;
      default:
        uniq = defaultUniq;
    }

    if (isFilterOff || cli.flags.startup) {
      const rawStartupDateList = await getStartupDateList();
      const startupDateList = uniq(rawStartupDateList);
      const startupDateListText = startupDateList
        .sort((a, b) => (cli.flags.desc ? b - a : a - b))
        .map(item => formatDate(item))
        .join('\n');
      console.log('Startup history:');
      console.log(startupDateListText, '\n');
    }

    if (cli.flags.startup) {
      return;
    }

    if (isFilterOff || cli.flags.shutdown) {
      const rawShutdownDateList = await getShutdownDateList();
      const shutdownDateList = uniq(rawShutdownDateList);
      const shutdownDateListText = shutdownDateList
        .sort((a, b) => (cli.flags.desc ? b - a : a - b))
        .map(item => formatDate(item))
        .join('\n');
      console.log('Shutdown history:');
      console.log(shutdownDateListText, '\n');
    }
  } catch (err) {
    console.error('clock-helper', err);
  }
})();
