<template>
  <view :class="className" :style="themeColors">
    <div :class="`${prefix}-wrapper`">
      <slot />
      <view v-if="maxCount < total" :class="`${prefix}-extra`" :style="extraStyle">
        {{ `+${total - maxCount}` }}
      </view>
    </div>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, computed, provide } from 'vue'
  import type { PropType } from 'vue'
  import { avatarGroupInjectionKey } from './context'
  import useTheme from '../../hooks/useTheme/useTheme'
  import { cs } from '../../utils/property'
  import type { AvatarProps } from '../ml-avatar/type'

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    maxCount: {
      type: Number,
      default: 3
    },
    size: {
      type: Number,
      default: 32
    },
    offset: {
      type: Number,
      default: 0
    },
    shape: {
      type: String as PropType<AvatarProps['shape']>,
      default: 'square'
    }
  })
  const { disabled, maxCount, size, offset, shape } = toRefs(props)
  const { themeColors } = useTheme()
  const prefix = 'ml-avatar-group'
  const className = computed(() => {
    return cs(prefix)
  })

  const total = ref(0)
  const getAvatarId = () => {
    return ++total.value
  }

  const extraStyle = computed(() => {
    return {
      width: `${size.value}px`,
      height: `${size.value}px`,
      marginLeft: `-${offset.value || size.value / 2}px`,
      borderRadius: shape.value === 'circle' ? '50%' : '5px'
    }
  })

  provide(
    avatarGroupInjectionKey,
    reactive({
      total,
      offset: offset.value,
      globalSize: size.value,
      globalShape: shape.value,
      maxCount: maxCount.value,
      getAvatarId
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
