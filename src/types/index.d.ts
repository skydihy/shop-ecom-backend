/* eslint-disable @typescript-eslint/ban-types */
import { Order } from '@/constants';
import { GeoShapeType } from '@/constants/geo';
import { Base } from '@/schemas/base.schema';
import * as admin from 'firebase-admin';

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
