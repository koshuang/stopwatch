export function secondsToString(value) {
  const dateObj = new Date(value * 1000);
  const hours = padZero(dateObj.getUTCHours());
  const minutes = padZero(dateObj.getUTCMinutes());
  const seconds = padZero(dateObj.getSeconds());

  const timeString = `${hours}:${minutes}:${seconds}`;

  return timeString;
}

function padZero(int) {
  return int.toString().padStart(2, '0');
}
