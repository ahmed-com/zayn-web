function toDateStr(date: Date) {
	return `${date.getDate()} / ${
		date.getMonth() + 1
	} / ${date.getFullYear()}`;
}

export function format(date: Date | string) {
	if (!date) return '-';

	const dateStr = toDateStr(new Date(date));
	const today = toDateStr(new Date(Date.now()));
	const yesterDay = toDateStr(new Date(Date.now() - 24 * 60 * 60 * 1000));

	if (dateStr == today) return 'Today';
	if (dateStr == yesterDay) return 'YesterDay';
	return dateStr;
}
