declare module 'suncalc' {
  import { SunsRaw } from 'src/singletons/interfaces'
  export function getTimes(
    date: Date,
    latitude: number,
    longitude: number,
  ): SunsRaw
}
