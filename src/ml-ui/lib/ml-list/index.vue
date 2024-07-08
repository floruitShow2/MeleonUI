<template>
  <view :class="className" :style="themeColors">
    <scroll-view
      :class="`${prefix}-scroll`"
      :scroll-y="true"
      :enable-flex="true"
      :upper-threshold="SCROLL_THRESHOLD"
      :lower-threshold="SCROLL_THRESHOLD"
      :scroll-top="scrollTop"
      :style="{ ...scrollStyles }"
      @scroll="handleScroll"
      @scrolltoupper="handleScrollToUpper"
      @scrolltolower="handleScrollToLower"
    >
      <!-- 虚拟列表 -->
      <template v-if="virtualList">
        <slot name="vitual" :data="visibleData"></slot>
      </template>
      <!-- 普通列表 -->
      <template v-else>
        <view v-for="(row, index) in visibleData" :key="row.id" :class="`${prefix}-scroll-item`">
          <slot name="item" :item="row" :index="index"></slot>
        </view>
      </template>

      <view v-if="finished || endIndex >= data.length" :class="`${prefix}-scroll-loaded`"> 没有更多了 </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, onMounted, getCurrentInstance, nextTick } from 'vue'
  import type { PropType, ComponentInternalInstance } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, getAllRect } from '@meleon/uni-ui/utils'
  import type { ListProps } from './index.interface'

  const props = defineProps({
    data: {
      type: Array as PropType<ListProps['data']>,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 15
    },
    height: {
      type: Number,
      required: true
    },
    itemHeight: {
      type: Number,
      default: 58
    },
    virtualList: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  })
  const { data, pageSize, height, itemHeight, virtualList, finished } = toRefs(props)

  const emit = defineEmits(['load'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-list')
  const className = computed(() => {
    return cs(prefix.value)
  })
  const scrollStyles = computed(() => {
    return {
      height: `${height.value}px`
    }
  })

  /**
   * virtual scroll
   */
  const SCROLL_THRESHOLD = ref(50)

  const innerItemHeight = ref(itemHeight.value)
  const totalHeight = ref(0)
  const instance = ref<ComponentInternalInstance>()
  const updateListHeight = async () => {
    instance.value = getCurrentInstance()!
    const res = await getAllRect(instance.value, `.${prefix.value}-scroll-item`)
    const total = res.reduce((accu, cur) => (accu += cur.height), 0)

    innerItemHeight.value = res.length ? total / res.length : itemHeight.value

    totalHeight.value = innerItemHeight.value * data.value.length
    SCROLL_THRESHOLD.value = innerItemHeight.value
  }
  watch(itemHeight, updateListHeight)

  const scrollTop = ref(0)
  const oldScrollTop = ref(0)

  const UPDATE_COUNT = ref(1)
  const startIndex = ref(0)
  const endIndex = ref(pageSize.value)
  const visibleData = computed<ListProps['data']>(() => {
    if (virtualList.value) {
      return data.value.slice(startIndex.value, endIndex.value)
    } else {
      return data.value
    }
  })

  const handleScroll = (e: MeleonEvents.ScrollInput) => {
    oldScrollTop.value = e.detail.scrollTop
  }
  const handleScrollToUpper = () => {
    if (!virtualList.value) return
    const minStartIndex = 0
    const minEndIndex = pageSize.value

    // 起始索引和结束索引 -1
    startIndex.value = Math.max(startIndex.value - UPDATE_COUNT.value, minStartIndex)
    endIndex.value = Math.max(endIndex.value - UPDATE_COUNT.value, minEndIndex)
  }
  const handleScrollToLower = () => {
    if (finished.value) return
    if (!virtualList.value) {
      emit('load')
      return
    }
    const maxEndIndex = data.value.length
    const maxStartIndex = data.value.length - pageSize.value

    // 起始索引和结束索引 +1
    if (virtualList.value) {
      startIndex.value = Math.min(startIndex.value + UPDATE_COUNT.value, maxStartIndex)
    }
    endIndex.value = Math.min(endIndex.value + UPDATE_COUNT.value, maxEndIndex)
  }

  onMounted(async () => {
    await updateListHeight()
  })
</script>

<style lang="less">
  @import './index.less';
</style>
