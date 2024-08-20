import { AbortablePromise } from './abortablePromise'

export const requestAnimationFrame = (cb = () => {}) => {
  return new AbortablePromise((resolve) => {
    const timer = setInterval(() => {
      clearInterval(timer)
      resolve(true)
      cb()
    }, 1000 / 30)
  })
}

export const requestAnimationDelay = (duration: number) => {
  return new AbortablePromise<void>((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, duration)
  })
}
