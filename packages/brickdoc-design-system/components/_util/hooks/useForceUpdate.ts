import * as React from 'react'

export default function useForceUpdate() {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)
  return forceUpdate
}
