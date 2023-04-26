export function numberToByteSize(number: number): string {
  if (number < 1024) {
    return `${number} B`;
  } else if (number < 1024 * 1024) {
    return `${(number / 1024).toFixed(2)} KB`;
  } else if (number < 1024 * 1024 * 1024) {
    return `${(number / 1024 / 1024).toFixed(2)} MB`;
  } else {
    return `${(number / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }
}