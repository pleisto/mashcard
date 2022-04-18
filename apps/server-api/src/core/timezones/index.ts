import * as tzdata from 'tzdata'

export const supportedTimezones = Object.keys(tzdata.zones).filter(
  tz =>
    // only contains standard timezones
    tz === 'Etc/UTC' || tz.match(/^(Africa|America|Antarctica|Asia|Atlantic|Australia|Europe|Indian|Pacific)\/.*/)
)
