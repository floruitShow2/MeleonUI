export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
  // 扩展全局属性
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}
