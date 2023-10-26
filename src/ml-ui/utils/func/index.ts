type AnyFunction = (...args: any[]) => any

// 组合函数
export const useCompose: (...props: Array<AnyFunction>) => AnyFunction = function (...funcs) {
  if (funcs.length === 0) return (arg) => arg
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}

// 防抖
interface DebounceOptions {
  delay: number
}
export const useDebounce = (fn: AnyFunction, options?: DebounceOptions) => {
  let timer: number | null = null
  return function <T>(...args: T[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(
      () => {
        fn.apply(args)
      },
      options ? options.delay : 500
    )
  }
}

// 深拷贝
export const useDeepClone: <T>(target: T) => T = (target) => {
  // 目标值为 非引用类型，直接返回目标值
  if (typeof target !== 'object') {
    return target
  }
  let temp: any
  if (Array.isArray(target)) {
    temp = []
    target.forEach((item) => {
      temp.push(useDeepClone(item))
    })
  } else {
    temp = {}
    for (const item in target) {
      if (target[item] instanceof Date) {
        const time = new Date(String(target[item]))
        temp[item] = time
      } else {
        temp[item] = useDeepClone(target[item])
      }
    }
  }
  return temp
}
export function useGet<T>(source: Record<string, any>, path: string, defaultValue?: T) {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let result = source
  for (const p of paths) {
    result = result[p]
    if (result === undefined) {
      console.log(result, p, source)
      return defaultValue
    }
  }
  return result as unknown
}
