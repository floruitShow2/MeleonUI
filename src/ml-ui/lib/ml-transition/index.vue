<template>
  <view :class="classNames" :style="styles">
    <slot />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, onBeforeMount } from 'vue'
  import type { PropType } from 'vue'
  import {
    AbortablePromise,
    cs,
    requestAnimationFrame,
    requestAnimationDelay
  } from '@meleon/uni-ui/utils'
  import type { TransitionProps } from './index.interface'

  const props = defineProps({
    appear: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 300
    },
    name: {
      type: String as PropType<TransitionProps['name']>,
      default: 'fade'
    },
    customClass: {
      type: String,
      default: ''
    },
    enterClass: {
      type: String,
      default: ''
    },
    enterActiveClass: {
      type: String,
      default: ''
    },
    enterToClass: {
      type: String,
      default: ''
    },
    leaveClass: {
      type: String,
      default: ''
    },
    leaveActiveClass: {
      type: String,
      default: ''
    },
    leaveToClass: {
      type: String,
      default: ''
    }
  })
  const { appear, name, duration, customClass } = toRefs(props)

  const emit = defineEmits([
    'before-enter',
    'enter',
    'enter-to',
    'before-leave',
    'leave',
    'leave-to'
  ])

  const prefix = ref('ml-transition')
  const classNames = computed(() => {
    return cs(prefix.value, classes.value, customClass.value)
  })
  const styles = computed(() => {
    return `-webkit-transition-duration:${currentDuration.value}ms;transition-duration:${currentDuration.value}ms;${
      display.value ? '' : 'display: none;'
    }`
  })

  const getClassNames = (name?: string) => {
    if (!name) {
      return {
        enter: `${props.enterClass} ${props.enterActiveClass}`,
        'enter-to': `${props.enterToClass} ${props.enterActiveClass}`,
        leave: `${props.leaveClass} ${props.leaveActiveClass}`,
        'leave-to': `${props.leaveToClass} ${props.leaveActiveClass}`
      }
    }

    return {
      enter: `ml-${name}-enter ml-${name}-enter-active`,
      'enter-to': `ml-${name}-enter-to ml-${name}-enter-active`,
      leave: `ml-${name}-leave ml-${name}-leave-active`,
      'leave-to': `ml-${name}-leave-to ml-${name}-leave-active`
    }
  }

  const inited = ref(false)
  const display = ref(false)

  const classes = ref<string>('')
  const currentDuration = ref<number>(0)

  const enterPromise = ref<AbortablePromise<void> | null>(null)

  const enterLifeCyclePromise = ref<AbortablePromise<unknown> | null>(null)
  const enter = () => {
    enterPromise.value = new AbortablePromise(async (resolve) => {
      try {
        // 获取 类名 和 动画持续时间
        const classNames = getClassNames(name.value)
        const localDuration = duration.value

        emit('before-enter')

        enterLifeCyclePromise.value = requestAnimationFrame()
        await enterLifeCyclePromise.value

        // 设置 进入时 的类名和动画持续时间
        classes.value = classNames['enter']
        currentDuration.value = localDuration
        emit('enter')

        enterLifeCyclePromise.value = requestAnimationFrame()
        await enterLifeCyclePromise.value

        // 初始化完成
        inited.value = true
        display.value = true

        enterLifeCyclePromise.value = requestAnimationFrame()
        await enterLifeCyclePromise.value

        // 结束动画
        enterLifeCyclePromise.value = null
        classes.value = classNames['enter-to']
        emit('enter-to')

        resolve()
      } catch (err) {
        console.log(err)
      }
    })
  }

  const leaveLifeCyclePromise = ref<AbortablePromise<unknown> | null>(null)
  const onTransitionEnd = () => {
    if (display.value && !appear.value) {
      display.value = false
    }
  }
  const leave = async () => {
    if (!enterPromise.value) {
      return onTransitionEnd()
    }

    try {
      await enterPromise.value

      // 获取 类名 和 动画持续时间
      const classNames = getClassNames(name.value)
      const localDuration = duration.value
      currentDuration.value = localDuration
      emit('before-leave')

      leaveLifeCyclePromise.value = requestAnimationFrame()
      await leaveLifeCyclePromise.value

      classes.value = classNames['leave']
      emit('leave')

      leaveLifeCyclePromise.value = requestAnimationFrame()
      await leaveLifeCyclePromise.value

      classes.value = classNames['leave-to']

      leaveLifeCyclePromise.value = requestAnimationDelay(localDuration)
      await leaveLifeCyclePromise.value

      leaveLifeCyclePromise.value = null
      emit('leave-to')
      onTransitionEnd()
      enterPromise.value = null
    } catch (err) {}
  }

  const handleAppear = (isAppear: boolean) => {
    if (isAppear) {
      enter()
    } else {
      leave()
    }
  }

  onBeforeMount(() => {
    if (appear.value) {
      enter()
    }
  })

  watch(appear, (newVal) => {
    handleAppear(newVal)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
