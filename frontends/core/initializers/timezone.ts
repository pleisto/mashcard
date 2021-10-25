export const timezoneInit = (): void => {
  globalThis.brickdocContext.timezone ||= Intl?.DateTimeFormat().resolvedOptions().timeZone || globalThis.brickdocContext.defaultTimezone
}
