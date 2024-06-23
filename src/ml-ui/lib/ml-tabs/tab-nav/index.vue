<template>
  <view :class="className" :style="themeColors">
    <scroll-view
      :class="listClassName"
      :scroll-x="true"
      :scroll-with-animation="scrollWithAnimation"
      :scroll-left="scrollLeft"
      :show-scrollbar="false"
    >
      <!-- tab list -->
      <Tab
        v-for="(tab, index) in tabs"
        :key="tab.value"
        :tab="tab"
        :active="activeKey"
        class="ml-tabs-tab"
        @click="(tab) => handleTabClick(tab, index)"
        @remove="handleTabRemove"
      >
        {{ tab.title }}
      </Tab>
      <!-- tab underline -->
      <view :class="`${prefix}-list-underline`" :style="underlineStyle" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, inject, getCurrentInstance } from 'vue'
  import type { PropType } from 'vue'
  import type { TabData } from '../../ml-tab/index.interface'
  import useTheme from '../../../hooks/useTheme/useTheme'
  import { cs } from '../../../utils/property'
  import { getAllRect, getRect } from '../../../utils/rect'
  import Tab from '../tab/index.vue'
  import { MlTabsGroupInjectionKey } from '../../ml-tab/context'

  const props = defineProps({
    tabs: {
      type: Array as PropType<TabData[]>,
      required: true
    },
    activeKey: {
      type: [String, Number],
      required: true
    }
  })

  const { tabs, activeKey } = toRefs(props)

  // 根据 globalCtx 初始化当前页面数据
  const globalCtx = inject(MlTabsGroupInjectionKey)
  const scrollWithAnimation = ref<boolean>(false)
  const scrollLeft = ref<number>(0)
  watch(
    () => globalCtx,
    (newVal) => {
      if (newVal) {
        scrollWithAnimation.value = newVal.scrollWithAnimation
      }
    },
    { deep: true }
  )

  const { themeColors } = useTheme()

  const prefix = ref('ml-tab_nav-header')
  const className = computed(() => {
    return cs(prefix.value)
  })
  const listClassName = computed(() => {
    return cs(`${prefix.value}-list`)
  })

  const instance = getCurrentInstance()

  const underlineStyle = ref<Record<string, any>>({})

  const updateOffset = async (index: number) => {
    // 查找对象
    const res = await Promise.all([
      getAllRect(instance, '.ml-tabs-tab'),
      getRect(instance, `.${prefix.value}-list-underline`),
      getRect(instance, `.${prefix.value}-list`)
    ])
    const [rects, lineRect, wrapperRect] = res as [
      Array<{ width: number; left: number }>,
      { width: number },
      { width: number; left: number }
    ]
    const rect = rects[index]
    lineRect.width = rect.width
    let lineOffsetLeft = (rects as Array<{ width: number }>)
      .slice(0, index)
      .reduce((prev, curr) => prev + curr.width, 0)

    lineOffsetLeft += (rect.width - lineRect.width) / 2

    scrollLeft.value = lineOffsetLeft - wrapperRect.width / 2
    underlineStyle.value = {
      width: `${rect.width}px`,
      // width: '20px',
      opacity: 1,
      transition: scrollWithAnimation.value ? 'all 0.3s ease' : 'none',
      transform: 'translateX(' + lineOffsetLeft + 'px) translateY(-5px)'
    }
  }

  const handleTabClick = async (tab: TabData, index: number) => {
    if (!globalCtx) return
    globalCtx.selectTabItem(tab.value)
    updateOffset(index)
  }
  const handleTabRemove = (tab: TabData) => {
    if (!globalCtx) return
    globalCtx.removeTabItem(tab.value)
  }

  watch(
    tabs,
    (newVal) => {
      if (globalCtx) {
        const idx = newVal.findIndex((item) => item.value === activeKey.value)
        if (idx !== -1) updateOffset(idx)
      }
    },
    { deep: true }
  )
</script>

<style lang="less">
  @import './index.less';
</style>
