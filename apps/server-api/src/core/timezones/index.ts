import * as tzdata from 'tzdata'

export const supportedTimezones = (Object.keys(tzdata.zones) as Array<keyof typeof tzdata.zones>).filter(
  tz =>
    // TODO make typescript narrow type in Array.filter
    // only contains standard timezones
    tz === 'Etc/UTC' || tz.match(/^(Africa|America|Antarctica|Asia|Atlantic|Australia|Europe|Indian|Pacific)\/.*/)
)

export type TimezoneType = typeof supportedTimezones[number]
