<template>
  <view :class="className" :hover-class="hoverClassName" :style="themeColors" @click="handleClick">
    <view v-if="loading || $slots['icon']" :class="`${prefix}-icon`">
      <MlIcon v-if="loading" icon="ml-loading" />
      <slot v-else name="icon" />
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
  import { computed, toRefs, getCurrentInstance } from 'vue'
  import type { PropType } from 'vue'
  import type { BaseButtonProps } from './type'
  import useTheme from '../../hooks/useTheme/useTheme'
  import { cs } from '../../utils/property'
  import MlIcon from '../ml-icon/index.vue'

  const props = defineProps({
    type: {
      type: String as PropType<BaseButtonProps['type']>,
      default: 'secondary'
    },
    size: {
      type: String as PropType<BaseButtonProps['size']>,
      default: 'small'
    },
    shape: {
      type: String as PropType<BaseButtonProps['shape']>,
      default: 'square'
    },
    status: {
      type: String as PropType<BaseButtonProps['status']>,
      default: 'normal'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['click'])

  const { slots } = getCurrentInstance()!
  const { size, shape, type, status, loading, disabled } = toRefs(props)

  const { themeColors } = useTheme()

  const prefix = 'ml-button'
  const className = computed(() => {
    return cs(
      prefix,
      [
        `${prefix}-${size.value}`,
        `${prefix}-${shape.value}`,
        `${prefix}-${type.value}`,
        `${prefix}-${status.value}`
      ],
      {
        [`${prefix}-disabled`]: disabled.value,
        [`${prefix}-only-icon`]: slots['icon'] !== undefined && !slots['default']
      }
    )
  })
  const hoverClassName = computed(() => {
    return cs(
      loading.value || disabled.value
        ? []
        : [`${prefix}-${type.value}-hover`, `${prefix}-${status.value}-hover`]
    )
  })

  const handleClick = (e: MouseEvent) => {
    if (loading.value || disabled.value) {
      e.preventDefault()
      return
    }
    emit('click', e)
  }
</script>

<style scoped lang="less">
  @import './index.less';
</style>
