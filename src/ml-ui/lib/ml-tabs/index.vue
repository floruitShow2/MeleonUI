<template>
  <view :class="className" :style="themeColors">
    <view class="ml-tabs_nav">
      <slot />
    </view>
    <view class="ml-tabs_content">content</view>
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed, getCurrentInstance, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import type { TabData } from '../ml-tab/type'

  const props = defineProps({
    active: {
      type: [String, Number],
      required: true
    }
  })
  const emit = defineEmits([])
  const {} = toRefs(props)
  const { themeColors } = useTheme()

  const prefix = 'ml-tabs'
  const className = computed(() => {
    return cs(prefix)
  })

  const instance = getCurrentInstance()

  const initSortedTab = (children: TabData[]) => {
    children.forEach((child) => {
      console.log(child, child.key, child.title)
    })
  }
  onMounted(() => {
    if (!instance) return
    const children = (instance as any).ctx.$children
    initSortedTab(children)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
