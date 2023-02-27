/**
 * @param {{ message: string; }} data
 */
export function isDataEmpty(data) {
  return !data || data.message === 'no results found'
}
