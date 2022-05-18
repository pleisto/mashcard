/**
 * return settings key with current namespace
 */
export const withNamespace = (key: string): string => `plugin.brickdoc.google-auth.${key}`
