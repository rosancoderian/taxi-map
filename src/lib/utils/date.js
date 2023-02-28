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
  const hours = !withMeridiem ? time : time % 12 || 12
  const minutes = ':00'
  const seconds = !withMeridiem ? ':00' : ''
  const ampm = time >= 12 ? ' PM' : ' AM'
  const meridiem = !withMeridiem ? '' : ampm
  const prefix = hours < 10 ? '0' : ''
  return `${prefix}${hours}${minutes}${seconds}${meridiem}`
}
