<template>
  <view :class="className" :style="themeColors">
    <div :class="`${prefix}-wrapper`">
      <slot />
    </div>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, computed, provide, getCurrentInstance } from 'vue'
  import type { PropType } from 'vue'
  import { avatarGroupInjectionKey } from '../ml-avatar/context'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    maxCount: {
      type: Number,
      default: 3
    }
  })
  const emit = defineEmits([])
  const { disabled, maxCount } = toRefs(props)
  const { themeColors } = useTheme()
  const prefix = 'ml-avatar-group'
  const className = computed(() => {
    return cs(prefix)
  })

  const total = ref(0)
  const instance = getCurrentInstance()
  console.log(instance)
  const addChildAvatar = () => {}

  provide(
    avatarGroupInjectionKey,
    reactive({
      total
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
