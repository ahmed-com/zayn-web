export const shortenText = (s:string) => `${s.substring(0,20)}${s.length >= 20 ? '...' : ''}`;