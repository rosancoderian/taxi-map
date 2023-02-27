/**
 * @param {string | number | Date} dateString
 */
export function isBeforeToday(dateString) {
	const today = new Date();
	const date = new Date(dateString);
	today.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);
	return date < today;
}

export function getYesterday() {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return yesterday;
}
