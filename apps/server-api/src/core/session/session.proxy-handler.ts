import { Session } from './session.class'

// allows us to use property getters and setters as well as get and set methods on session object
export const sessionProxyHandler: ProxyHandler<Session> = {
  get(target, prop: string) {
    // Calling functions eg request.session.get('key') or request.session.set('key', 'value')
    if (typeof target[prop] === 'function') {
      return new Proxy(target[prop], {
        apply(applyTarget, thisArg, args) {
          return Reflect.apply(applyTarget, target, args)
        }
      })
    }

    // Accessing properties eg request.session.changed
    if (Object.prototype.hasOwnProperty.call(target, prop)) {
      return target[prop]
    }

    // accessing session property
    return target.get(prop)
  },
  set(target, prop: string, value) {
    target.set(prop, value)
    return true
  }
}
