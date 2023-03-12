export const formatSeconds = (totalSeconds: number): TimerFormat => {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const h = hours < 10 ? `0${hours}` : `${hours}`;
  const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const s = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return { h, m, s, withHours: hours > 0, withMinutes: minutes > 0 };
};

export type TimerFormat = {
  h: string;
  m: string;
  s: string;
  withHours: boolean;
  withMinutes: boolean;
};
