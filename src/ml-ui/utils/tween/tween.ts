import * as Easing from './easing'
import { getDecimalPlaces } from '../number/index'
import type { TweenOptionsType } from './type'

export class Tween {
  from: Record<string, number>
  to: Record<string, number>
  duration: number
  delay: number
  easing: string

  startTime: number
  started: boolean
  finished: boolean

  time!: number
  elapsed: number = 0
  timer: NodeJS.Timeout | null

  precision: Record<string, number> = {}
  // 存储实时更新的值
  keys: Record<string, number>

  onStart: TweenOptionsType['onStart']
  onUpdate: TweenOptionsType['onUpdate']
  onFinish: TweenOptionsType['onFinish']

  constructor(options: TweenOptionsType) {
    const {
      from,
      to,
      duration,
      precision: defaultPrecision,
      delay,
      easing,
      onStart,
      onUpdate,
      onFinish
    } = options

    // 当 from & to 的键不完全匹配时，补全键值对
    for (const key in from) {
      // 判断有无传递 defaultPrecision 属性，没有则自行计算每个 key 对应的值的小数点位数
      this.precision[key] = defaultPrecision || getDecimalPlaces(to[key])
      if (!Object.prototype.hasOwnProperty.call(to, key)) {
        to[key] = from[key]
      }
    }
    for (const key in to) {
      if (!Object.prototype.hasOwnProperty.call(from, key)) {
        from[key] = to[key]
        this.precision[key] = defaultPrecision || getDecimalPlaces(to[key])
      }
    }

    this.from = from
    this.to = to
    this.duration = duration || 500
    this.delay = delay || 0
    this.easing = easing || 'linear'

    this.startTime = Date.now() + this.delay
    this.started = false
    this.finished = false
    this.timer = null
    this.keys = {}

    this.onStart = onStart
    this.onUpdate = onUpdate
    this.onFinish = onFinish
  }

  requestAnimationFrame(callback: (...args: any[]) => any) {
    const currTime = new Date().getTime()
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    const timeToCall = Math.max(0, 16 - (currTime - this.elapsed))
    const id = setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall)
    this.elapsed = currTime + timeToCall
    return id
  }
  cancelAnimationFrame(timerId: number) {
    clearTimeout(timerId)
  }

  update() {
    this.time = Date.now()
    // delay some time
    if (this.time < this.startTime) {
      return
    }
    if (this.finished) {
      return
    }
    // finish animation
    if (this.elapsed === this.duration) {
      if (!this.finished) {
        this.finished = true
        this.onFinish && this.onFinish(this.keys)
      }
      return
    }
    this.elapsed = this.time - this.startTime
    this.elapsed = this.elapsed > this.duration ? this.duration : this.elapsed
    for (const key in this.to) {
      const toValue = this.to[key]
      const fromValue = this.from[key]
      const precisionVlaue = this.precision[key]
      this.keys[key] = +(
        fromValue +
        (toValue - fromValue) *
          (Easing as unknown as Record<string, (t: number) => number>)[this.easing](
            this.elapsed / this.duration
          )
      ).toFixed(precisionVlaue)
    }
    if (!this.started) {
      this.onStart && this.onStart(this.keys)
      this.started = true
    }
    this.onUpdate && this.onUpdate(this.keys)
  }

  start() {
    this.startTime = Date.now() + this.delay
    const tick = () => {
      this.update()
      this.timer = this.requestAnimationFrame(tick)
      if (this.finished) {
        this.cancelAnimationFrame(Number(this.timer))
        this.timer = null
      }
    }
    tick()
  }

  stop() {
    if (this.timer) this.cancelAnimationFrame(Number(this.timer))
    this.timer = null
  }
}
