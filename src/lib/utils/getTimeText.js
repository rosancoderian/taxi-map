export const getTimeText = (/** @type {number} */ time, withMeridiem = true) => {
	const meridiem = time >= 12 ? ' PM' : ' AM';
	const prefix = time < 10 ? '0' : '';
	return `${prefix}${time}:00:00${withMeridiem ? meridiem : ''}`;
};
