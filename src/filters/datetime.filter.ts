import { format as formatDate } from './date.filter';

function toTimeStr(date: Date) {
	const hours = date.getHours() % 12;
	const mins = date.getMinutes();
	const period = date.getHours() - hours === 0 ? 'AM' : 'PM';
	return `${hours}:${mins} ${period}`;
}

export function format(date: Date | string) {
  if (!date) return '-';
  date = new Date(date);
  const dateStr = formatDate(date);
  if ((Date.now() - date.valueOf()) > 12 * 60 * 60 * 1000) return `${dateStr} at ${toTimeStr(date)}`;
  const hoursElapsed = Math.floor((Date.now() - date.valueOf()) / (60 * 60 * 1000));
  const timeStr = hoursElapsed === 0 ? 'Just Now' : `${hoursElapsed} hours ago`;
  return `${dateStr} at ${timeStr}`; 
}