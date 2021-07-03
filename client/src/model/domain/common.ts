export type Opt<T> = T | undefined | null;

export interface At {
  at: Date;
  tz: string;
  prettyDate: string;
  prettyTime: string;
}