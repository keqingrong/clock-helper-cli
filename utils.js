/**
 * 判断是否是 Date 对象
 * @param {*} value
 */
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * 判断年月日是否相同
 * @param {Date} date1
 * @param {Date} date2
 */
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * 时间序列解析
 * @param {string[] | Date[]} dates
 */
function parseDates(dates = []) {
  return isDate(dates[0]) ? dates : dates.map(item => new Date(item));
}

/**
 * 时间去重，以天为单位，同一天取最早时间
 * @param {Date[]} dates
 * @example
 * ['2019-09-04 12:00:15', '2019-09-04 18:01:53', '2019-09-04 20:35:32']
 * =>
 * ['2019-09-04 12:00:15']
 */
function uniqDateByEarliestTime(dates) {
  const len = dates.length;
  if (len <= 1) {
    return dates;
  }
  return dates
    .sort((a, b) => a - b)
    .filter((value, index, array) => {
      // 第一项和第二项比较
      const refValue = index === 0 ? array[index + 1] : array[index - 1];
      if (isSameDay(value, refValue)) {
        // 取最早时间
        return value - refValue < 0 ? true : false;
      } else {
        return true;
      }
    });
}

/**
 * 时间去重，以天为单位，同一天取最晚时间
 * @param {Date[]} dates
 * @example
 * ['2019-09-04 12:00:15', '2019-09-04 18:01:53', '2019-09-04 20:35:32']
 * =>
 * ['2019-09-04 20:35:32']
 */
function uniqDateByLatestTime(dates) {
  const len = dates.length;
  if (len <= 1) {
    return dates;
  }
  return dates
    .sort((a, b) => a - b)
    .filter((value, index, array) => {
      // 最后一项和倒数第二项比较
      const refValue = index !== len - 1 ? array[index + 1] : array[index - 1];
      if (isSameDay(value, refValue)) {
        // 取最晚时间
        return value - refValue > 0;
      } else {
        return true;
      }
    });
}

module.exports = {
  isDate,
  isSameDay,
  parseDates,
  uniqDateByEarliestTime,
  uniqDateByLatestTime
};
