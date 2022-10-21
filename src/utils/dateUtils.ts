import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

// 转换成 YYYY-MM-DD HH:mm:ss 格式
export function formatToDateTime(
  date: dayjs.ConfigType | string = null,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format)
}
// 转换成 YYYY-MM-DD 格式
export function formatToDate(date: dayjs.ConfigType | string = null, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

/**
 * 获取「xxx前」
 * 如果是一分钟之内显示秒数，一小时之内显示分钟数，一天之内显示小时
 * 如果超过24小时那么显示 昨天 或者几天前，两个月之前的显示时间
 */
export const timeAgoFrom = function (startTime: dayjs.ConfigType): string {
  const now = new Date().getTime()
  const timer = dayjs(startTime).valueOf()
  const second = now - 1000 * 60
  const minute = now - 1000 * 60 * 60
  const hour = now - 1000 * 60 * 60 * 24
  const day = now - 1000 * 60 * 60 * 24 * 60
  // const month = now - 1000 *60 *60 *24 * 365
  if (second < timer) {
    return `${Math.floor((now - timer) / 1000)} 秒前`
  }
  else if (minute < timer) {
    return `${Math.floor((now - timer) / (1000 * 60))} 分钟前`
  }
  else if (hour < timer) {
    return `${Math.floor((now - timer) / (1000 * 60 * 60))} 小时前`
  }
  else if (day < timer) {
    if (Math.floor((now - timer) / (1000 * 60 * 60 * 24)) === 1)
      return '昨天'

    return `${Math.floor((now - timer) / (1000 * 60 * 60 * 24))} 天前`
  }
  else {
    return `${dayjs(startTime).format('YYYY[年]MM[月]DD[日] HH:mm:ss')}`
  }
  // 注释掉的为几月几年前，改为显示当时的年月日
  // else if( month < timer ) {
  //   return `${ Math.floor((now - timer) / (1000 * 60 * 60 * 24 * 60 ) ) }月前`
  // } else {
  //   return `${ Math.floor((now - timer) / (1000 * 60 * 60 * 24 * 365) ) }年前`
  // }
}

export const dateUtil = dayjs
