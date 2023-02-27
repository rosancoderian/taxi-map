/**
 * @param {string | number | Date} dateString
 */
export function isBeforeToday(dateString) {
  const today = new Date()
  const date = new Date(dateString)
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date < today
}

export function getYesterday() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday
}

export function getTimeText(/** @type {number} */ time, withMeridiem = true) {
  const meridiem = time >= 12 ? ' PM' : ' AM'
  const prefix = time < 10 ? '0' : ''
  return `${prefix}${time}:00${withMeridiem ? '' : ':00'}${withMeridiem ? meridiem : ''}`
}
