export const currentPodUsername = (context: MashcardContext): string => {
  // This is removed because we should get current pod username from the client
  // return context.currentPodLegacy?.domainLegacy || ''

  // Hack way to get the current pod username, fallback to personal username
  // TODO tobe removed when we have current pod state management.
  return (globalThis.location.pathname.split('/')[1] || context.currentUser?.domain) ?? ''
}
