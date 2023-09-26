const needLogin: string[] = []
const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
list.forEach((item) => {
  //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
  //   console.log(item, 'router list item')
  uni.addInterceptor(item, {
    invoke(e) {
      // 调用前拦截
      //获取用户的token
      console.log(e, 'routerjs invoke')
      const token = uni.getStorageSync('token')
      //获取当前页面路径（即url去掉"?"和"?"后的参数）
      console.log(token, 'router index token')
      const url = e.url.split('?')[0]
      console.log(url, 'router index url')

      console.log(needLogin.includes(url))
      //判断要打开的页面是否需要验证登录
      if (needLogin.includes(url) && token === '') {
        uni.showToast({
          title: '该页面需要登录才能访问，请先登录',
          icon: 'none'
        })
        uni.navigateTo({
          url: '/pages/login/login'
        })
        return false
      }

      return true
    },
    returnValue: (...rest) => {
      console.log(rest)
    },
    success: (e) => {
      console.log(e)
    },
    fail(err) {
      // 失败回调拦截
      console.log(err)
    },
    complete: (e) => {
      console.log(e)
    }
  })
})
