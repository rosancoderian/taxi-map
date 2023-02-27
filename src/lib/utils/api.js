/**
 * @param {{ message: string; }} data
 */
export function isDataExist(data) {
	return !data || data.message === 'no results found'
}
