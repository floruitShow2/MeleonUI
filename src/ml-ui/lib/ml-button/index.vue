<template>
  <view :class="className" :hover-class="hoverClassName" :style="themeColors" @click="handleClick">
    <view v-if="loading || $slots['icon']" :class="`${prefix}-icon`">
      <MlIcon v-if="loading" name="ml-loading" />
      <slot v-else name="icon" />
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, toRefs, getCurrentInstance } from 'vue'
  import type { PropType } from 'vue'
  import type { ButtonProps } from './index.interface'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import MlIcon from '@meleon/uni-ui/lib/ml-icon/index.vue'

  const props = defineProps({
    type: {
      type: String as PropType<ButtonProps['type']>,
      default: 'secondary'
    },
    size: {
      type: String as PropType<ButtonProps['size']>,
      default: 'small'
    },
    shape: {
      type: String as PropType<ButtonProps['shape']>,
      default: 'square'
    },
    status: {
      type: String as PropType<ButtonProps['status']>,
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

  const prefix = ref('ml-button')
  const className = computed(() => {
    const prefixCls = prefix.value
    return cs(
      prefixCls,
      [
        `${prefixCls}-${size.value}`,
        `${prefixCls}-${shape.value}`,
        `${prefixCls}-${type.value}`,
        `${prefixCls}-${status.value}`
      ],
      {
        [`${prefixCls}-disabled`]: disabled.value,
        [`${prefixCls}-only-icon`]: slots['icon'] !== undefined && !slots['default']
      }
    )
  })
  const hoverClassName = computed(() => {
    return cs(
      loading.value || disabled.value
        ? []
        : [`${prefix.value}-${type.value}-hover`, `${prefix.value}-${status.value}-hover`]
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
