const test = require('ava');
const {
  parseDates,
  uniqDateByEarliestTime,
  uniqDateByLatestTime
} = require('./utils');

test('parseDates', t => {
  t.deepEqual(parseDates(['2019-09-04 12:00:15']), [
    new Date('2019-09-04 12:00:15')
  ]);
});

const dates1 = parseDates([
  '2019-09-04 12:00:15',
  '2019-09-04 18:01:53',
  '2019-09-04 20:35:32'
]);

const dates2 = parseDates([
  '2019-09-04 12:00:15',
  '2019-09-04 18:01:53',
  '2019-09-04 20:35:32',
  '2019-09-05 18:01:53',
  '2019-09-06 20:35:32'
]);

const dates3 = parseDates([
  '2019-09-02 18:01:53',
  '2019-09-03 20:35:32',
  '2019-09-04 12:00:15',
  '2019-09-04 18:01:53',
  '2019-09-04 20:35:32'
]);

const dates4 = parseDates(['2019-09-04 12:00:15']);

test('uniqDateByEarliestTime', t => {
  t.deepEqual(
    uniqDateByEarliestTime(dates1),
    parseDates(['2019-09-04 12:00:15'])
  );
  t.deepEqual(
    uniqDateByEarliestTime(dates2),
    parseDates([
      '2019-09-04 12:00:15',
      '2019-09-05 18:01:53',
      '2019-09-06 20:35:32'
    ])
  );
  t.deepEqual(
    uniqDateByEarliestTime(dates3),
    parseDates([
      '2019-09-02 18:01:53',
      '2019-09-03 20:35:32',
      '2019-09-04 12:00:15'
    ])
  );
  t.deepEqual(
    uniqDateByEarliestTime(dates4),
    parseDates(['2019-09-04 12:00:15'])
  );
  t.deepEqual(uniqDateByEarliestTime([]), []);
});

test('uniqDateByLatestTime', t => {
  t.deepEqual(
    uniqDateByLatestTime(dates1),
    parseDates(['2019-09-04 20:35:32'])
  );
  t.deepEqual(
    uniqDateByLatestTime(dates2),
    parseDates([
      '2019-09-04 20:35:32',
      '2019-09-05 18:01:53',
      '2019-09-06 20:35:32'
    ])
  );
  t.deepEqual(
    uniqDateByLatestTime(dates3),
    parseDates([
      '2019-09-02 18:01:53',
      '2019-09-03 20:35:32',
      '2019-09-04 20:35:32'
    ])
  );
  t.deepEqual(
    uniqDateByLatestTime(dates4),
    parseDates(['2019-09-04 12:00:15'])
  );
  t.deepEqual(uniqDateByLatestTime([]), []);
});
