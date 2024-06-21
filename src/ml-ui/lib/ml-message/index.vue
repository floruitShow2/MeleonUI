<template>
  <view :class="className" :style="themeColors">
    <!-- 顶部消息 -->
    <view :class="`${prefix}-top__wrapper`" :style="styles.topWrapperStyle">
      <view
        v-for="message in messagesAtTop"
        :key="message.id"
        :animation="messageInstance.getAnimationData(message.id)"
        :class="
          cs(`${prefix}-item`, message.id?.toString(), `is-${message.type}`, {
            [`${prefix}-item--closable`]: message.closable || false
          })
        "
      >
        <view :class="`${prefix}-item--content`">
          <MlIcon
            :name="iconsMap[message.type || 'primary'].icon"
            :size="20"
            :color="iconsMap[message.type || 'primary'].color"
            style="margin-right: 5px"
          />
          <text>{{ message.content }}</text>
        </view>
        <MlIcon
          v-if="message.closable"
          name="ml-close"
          :size="18"
          color="#999999"
          style="margin-left: 5px"
          @click="handleCloseMessage(message)"
        />
      </view>
    </view>
    <!-- 底部消息 -->
    <view :class="`${prefix}-bottom__wrapper`" :style="styles.bottomWrapperStyle">
      <view
        v-for="message in messagesAtBttom"
        :key="message.id"
        :animation="messageInstance.getAnimationData(message.id)"
        :class="
          cs(`${prefix}-item`, message.id?.toString(), `is-${message.type}`, {
            [`${prefix}-item--closable`]: message.closable || false
          })
        "
      >
        <view :class="`${prefix}-item--content`">
          <MlIcon
            :name="iconsMap[message.type || 'primary'].icon"
            :size="20"
            :color="iconsMap[message.type || 'primary'].color"
            style="margin-right: 5px"
          />
          <text>{{ message.content }}</text>
        </view>
        <MlIcon
          v-if="message.closable"
          name="ml-close"
          :size="18"
          color="#999999"
          style="margin-left: 5px"
          @click="handleCloseMessage(message)"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed, getCurrentInstance, reactive } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, generateDeviceUI } from '@meleon/uni-ui/utils'
  import MlMessage from './MlMessage'
  import type { MessageOptions } from './index.interface'
  import MlIcon from '../ml-icon/index.vue'

  const props = defineProps({
    duration: {
      type: Number,
      default: 1200
    }
  })

  const { duration } = toRefs(props)

  const emit = defineEmits([])
  const { themeColors } = useTheme()

  const prefix = 'ml-message'
  const className = computed(() => {
    return cs(prefix)
  })

  const styles = computed(() => {
    const { statusBarHeight, customBarHeight, tabbarHeight, bottomBarHeight } =
      generateDeviceUI().ui

    return {
      topWrapperStyle: {
        top: `${statusBarHeight + customBarHeight}px`
      },
      bottomWrapperStyle: {
        bottom: `${tabbarHeight + bottomBarHeight}px`
      }
    }
  })

  const instance = getCurrentInstance()
  const messageInstance = new MlMessage(instance)

  const messagesAtTop = computed(() =>
    messageInstance.messages.value.filter((item) => item.position === 'top')
  )
  const messagesAtBttom = computed(() =>
    messageInstance.messages.value.filter((item) => item.position === 'bottom')
  )

  const DefaultOptions = computed<Partial<MessageOptions>>(() => {
    return {
      position: 'top',
      duration: duration.value
    }
  })

  const handleCloseMessage = (message: MessageOptions) => {
    messageInstance.remove(message)
  }

  // 控制消息类型
  const iconsMap = reactive({
    primary: {
      icon: 'ml-info--circle',
      color: 'var(--primary-color-6)'
    },
    info: {
      icon: 'ml-info--circle',
      color: 'var(--info-color-8)'
    },
    success: {
      icon: 'ml-selection--circle',
      color: 'var(--success-color-6)'
    },
    warning: {
      icon: 'ml-info--circle',
      color: 'var(--warning-color-6)'
    },
    danger: {
      icon: 'ml-close--circle',
      color: 'var(--danger-color-6)'
    }
  })
  const primary = (options: MessageOptions) => {
    messageInstance.add({ ...DefaultOptions.value, ...options, type: 'primary' })
  }
  const info = (options: MessageOptions) => {
    messageInstance.add({ ...DefaultOptions.value, ...options, type: 'info' })
  }
  const success = (options: MessageOptions) => {
    messageInstance.add({ ...DefaultOptions.value, ...options, type: 'success' })
  }
  const warning = (options: MessageOptions) => {
    messageInstance.add({ ...DefaultOptions.value, ...options, type: 'warning' })
  }
  const danger = (options: MessageOptions) => {
    messageInstance.add({ ...DefaultOptions.value, ...options, type: 'danger' })
  }

  defineExpose({
    primary,
    info,
    success,
    warning,
    danger
  })
</script>

<style lang="less">
  @import './index.less';
</style>
