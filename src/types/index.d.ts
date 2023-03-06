/* eslint-disable @typescript-eslint/ban-types */

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type PropertyOf<T> = Pick<
  T,
  Exclude<keyof T, FilteredKeys<T, Function>>
>;

export type ExtractModel<T> = Omit<
  T,
  keyof Omit<Document, 'id' | 'createdAt' | 'updatedAt'>
>;
