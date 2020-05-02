import { useState, useEffect, useMemo } from 'react'
import numeral from 'numeral'

const dev = process.env.NODE_ENV === 'development'

export function useTimeAgo(time = 0) {
  const [timeAgo, setTimeAgo] = useState(() => getTimeAgo(time))

  useEffect(() => {
    setTimeAgo(getTimeAgo(time))
  }, [time])

  return timeAgo
}

export function currencyWrapper(num) {
  return useMemo(() => 'NGN' + numeral(Number(num)).format('0,0.00'), [num])
}

export function useAmountDisplay(num = 0) {
  return [
    num,
    useMemo(() => 'NGN' + numeral(Number(num)).format('0,0.00'), [num]),
  ]
}

export const getTimeAgo = (time) => {
  let diff = Math.floor(new Date().getTime() / 1000 - time.getTime() / 1000)
  let timeDiff

  let MINUTE = 60
  let HOUR = MINUTE * 60
  let DAY = HOUR * 24
  let WEEK = DAY * 7
  let MONTH = DAY * 30
  let YEAR = DAY * 356

  const t = new Date(time * 1000)
  if (diff >= YEAR) {
    timeDiff = `${t.getDate()}/${
      t.getMonth() + 1
    }/${t.getYear().toString().slice(1, 3)}`
  } else if (diff >= MONTH) {
    timeDiff = `${getMonth(t.getMonth())} ${t.getDate()}`
  } else if (diff > WEEK) {
    const duration = Math.floor(diff / WEEK)
    timeDiff = duration.toString() + ` week${duration !== 1 ? 's' : ''} ago`
  } else if (diff === WEEK) {
    timeDiff = getDay(t.getDay())
  } else if (diff > DAY) {
    const duration = Math.floor(diff / DAY)
    timeDiff = duration.toString() + ` day${duration !== 1 ? 's' : ''} ago`
  } else if (diff === DAY) {
    timeDiff = 'Yesterday'
  } else if (diff >= HOUR) {
    const duration = Math.floor(diff / HOUR)
    timeDiff = duration.toString() + ` hour${duration !== 1 ? 's' : ''} ago`
  } else if (diff >= MINUTE) {
    const duration = Math.floor(diff / MINUTE)
    timeDiff = duration.toString() + ` min${duration !== 1 ? 's' : ''} ago`
  } else timeDiff = diff.toString() + `s`

  return timeDiff
}

const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]
const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const getMonth = (month) => monthList[month]

const getDay = (day) => dayList[day - 1]
export function toISODate(date = 0) {
  if (!date) return ''
  return new Date(date * 1000).toISOString()
}
