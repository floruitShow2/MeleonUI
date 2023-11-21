import { ref } from 'vue'
import type { Ref, ComponentInternalInstance } from 'vue'
import type { MlMessageOptions } from './type'

class MessageInstance {
  messages!: Ref<MlMessageOptions[]>

  messagesId!: Set<number | string>

  messagesCount: number = 0

  messagesAnimation!: Ref<Record<number | string, UniApp.Animation>>

  instance!: ComponentInternalInstance

  constructor(instance: ComponentInternalInstance | null) {
    if (!instance) return
    this.instance = instance
    this.messages = ref([])
    this.messagesId = new Set()
    this.messagesAnimation = ref({})
  }

  add(options: MlMessageOptions) {
    this.messagesCount++

    const id = `ml-message--${this.messagesCount}`
    options = { id, ...options }

    this.messagesId.add(id)
    this.messages.value.push(options)

    // 创建异步任务，等待节点渲染后再添加样式
    setTimeout(() => {
      this.addAnimationData(options)
    }, 200)

    const timer = setTimeout(() => {
      this.remove(options)
    }, options.duration || 1200)

    return {
      close: () => {
        if (timer) clearTimeout(timer)
        this.remove(options)
      }
    }
  }

  createAnimationData(message: MlMessageOptions, status: 'in' | 'out' = 'in'): UniApp.Animation {
    const animation = uni.createAnimation({
      transformOrigin: '0 50%',
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })

    const strategyMap = {
      'top-in': () => {
        animation.translateY(10).opacity(1).step()
      },
      'top-out': () => {
        animation.translateY(-10).opacity(0).step()
      },
      'bottom-in': () => {
        animation.translateY(-10).opacity(1).step()
      },
      'bottom-out': () => {
        animation.translateY(-20).opacity(0).step()
      }
    }

    strategyMap[`${message.position || 'top'}-${status}`]()

    return animation.export()
  }

  addAnimationData(message: MlMessageOptions) {
    if (message.id) this.messagesAnimation.value[message.id] = this.createAnimationData(message)
  }

  getAnimationData(id?: string | number) {
    if (!id) return null
    return this.messagesAnimation.value[id]
  }

  remove(message: MlMessageOptions) {
    const { id } = message
    if (!id) return
    this.messagesAnimation.value[id] = this.createAnimationData(message, 'out')

    setTimeout(() => {
      for (let i = 0; i < this.messages.value.length; i++) {
        const item = this.messages.value[i]
        if (item.id === id) {
          this.messages.value.splice(i, 1)
          this.messagesId.delete(id)
          break
        }
      }
    }, 500)
  }
}

export default MessageInstance
