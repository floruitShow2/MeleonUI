<template>
  <view :class="className" :style="themeColors">
    <view class="ml-tabs_nav">
      <TabNav :tabs="sortedTabs" :active-key="activeKey" />
    </view>
    <view class="ml-tabs_content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, getCurrentInstance, onMounted, provide, reactive } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import TabNav from './tab-nav/index.vue'
  import { MlTabsGroupInjectionKey } from '../ml-tab/context'
  import type { TabData } from '../ml-tab/type'

  const props = defineProps({
    active: {
      type: [String, Number],
      required: true
    },
    scrollWithAnimation: {
      type: Boolean,
      default: true
    }
  })
  const { scrollWithAnimation } = toRefs(props)

  const emit = defineEmits([])
  const { themeColors } = useTheme()

  const prefix = 'ml-tabs'
  const className = computed(() => {
    return cs(prefix)
  })

  const instance = getCurrentInstance()

  // 获取插槽内所有 MlTab 组件内的数据
  const activeKey = ref(props.active)
  const tabMap = ref<Map<number | string, TabData>>(new Map())
  // const initSortedTab = (children: TabData[]) => {
  //   children.forEach((child) => {
  //     const { value, title, disabled, closable } = child
  //     if (value) tabMap.value.set(value, { value, title, disabled, closable })
  //   })
  // }

  const sortedTabs = computed(() => {
    return Array.from(tabMap.value.values())
  })
  const tabKeys = computed(() => {
    return sortedTabs.value.map((tab) => tab.value)
  })

  const selectTabItem = (id: string | number) => {
    activeKey.value = id
  }

  const addTabItem = (id: number | string, tabData: TabData) => {
    tabMap.value.set(id, tabData)
  }

  const removeTabItem = (id: number | string) => {
    // 只剩下一个 tab 时，禁用移除操作
    if (tabKeys.value.length === 1) return

    const idx = tabKeys.value.findIndex((item) => item === id)

    // 移除的 tab 是当前激活的 tab时
    if (activeKey.value === id) {
      activeKey.value = tabKeys.value[idx > 0 ? idx - 1 : idx + 1]
    }

    if (tabMap.value.has(id)) {
      tabMap.value.delete(id)
    }
  }

  onMounted(() => {
    if (!instance) return
    console.log(tabKeys.value, tabMap.value)
    // const children = (instance as any).ctx.$children
    // initSortedTab(children)
  })

  provide(
    MlTabsGroupInjectionKey,
    reactive({
      activeKey,
      scrollWithAnimation: scrollWithAnimation.value,
      selectTabItem,
      addTabItem,
      removeTabItem
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
