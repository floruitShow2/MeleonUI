export class AbortablePromise<T> {
  promise!: Promise<T>

  _reject!: (reason?: any) => void

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    this.promise = new Promise<T>((resolve, reject) => {
      executor(resolve, reject)
      this._reject = reject
    })
  }

  // 手动结束 promise
  abort(error?: any) {
    if (this._reject) {
      this._reject(error)
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
  ) {
    return this.promise.then(onfulfilled, onrejected)
  }

  catch<TResult = never>(
    onrejected: (reason: any) => TResult | PromiseLike<TResult>
  ): Promise<T | TResult> {
    return this.promise.catch(onrejected)
  }
}
