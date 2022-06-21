export const timezoneInit = (): void => {
  globalThis.mashcardContext.timezone ||=
    Intl?.DateTimeFormat().resolvedOptions().timeZone || globalThis.mashcardContext.defaultTimezone
}
