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

export function getTimeText(/** @type {number} */ time, withSeconds = false) {
  const prefix = time < 10 ? '0' : ''
  const hours = time >= 24 ? '23' : time
  const minutes = time >= 24 ? ':59' : ':00'

  let seconds = ''

  if (withSeconds) {
    seconds = time >= 24 ? ':59' : ':00'
  }

  return `${prefix}${hours}${minutes}${seconds}`
}
