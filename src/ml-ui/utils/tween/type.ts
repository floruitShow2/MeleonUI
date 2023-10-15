export interface TweenOptionsType {
  from: Record<string, number>
  to: Record<string, number>
  duration?: number
  delay?: number
  easing?: string
  precision?: number
  onStart?: (keys: Record<string, number>) => any
  onUpdate?: (keys: Record<string, number>) => any
  onFinish?: (keys: Record<string, number>) => any
}
