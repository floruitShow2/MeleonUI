<template>
  <view :class="className" :style="themeColors">
    <scroll-view
      :class="`${prefix}-scroll`"
      :scroll-y="true"
      :enable-flex="true"
      :upper-threshold="SCROLL_THRESHOLD"
      :lower-threshold="SCROLL_THRESHOLD"
      :scroll-top="scrollTop"
      :scroll-into-view="intoViewId"
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
        <view
          v-for="(row, index) in visibleData"
          :key="row.id"
          :id="row.id"
          :class="`${prefix}-scroll-item`"
        >
          <slot name="item" :item="row" :index="index"></slot>
        </view>
      </template>
      <!-- 加载中提示 -->
      <view v-if="loading && !finished" :class="`${prefix}-scroll-loading`">
        <slot name="loading">
          {{ loadingText }}
        </slot>
      </view>
      <!-- 加载异常提示 -->
      <view
        v-if="error && !loading && !finished"
        :class="`${prefix}-scroll-error`"
        @click="handleClickError"
      >
        <slot name="error">
          {{ errorText }}
        </slot>
      </view>
      <!-- 加载完成提示 -->
      <view v-if="finished || endIndex >= data.length" :class="`${prefix}-scroll-finished`">
        <slot name="finished">
          {{ finishedText }}
        </slot>
      </view>
    </scroll-view>
    <!-- 回到顶部按钮 -->
    <view v-if="isScrollToTopShow" :class="`${prefix}-to-top`" @click="scrollToTop">
      <Icon name="ml-arrow-upper--fill" :size="16" />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, onMounted, getCurrentInstance, nextTick } from 'vue'
  import type { PropType, ComponentInternalInstance } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, getAllRect } from '@meleon/uni-ui/utils'
  import type { ListProps, WithId } from './index.interface'
  import Icon from '../ml-icon/index.vue'

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
    loadingText: {
      type: String,
      default: '加载中...'
    },
    error: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: '加载失败，点击重试'
    },
    finished: {
      type: Boolean,
      default: false
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    showToTop: {
      type: Boolean,
      default: false
    }
  })
  const {
    data,
    pageSize,
    height,
    itemHeight,
    loading,
    error,
    finished,
    showToTop,
    virtualList
  } = toRefs(props)

  const emit = defineEmits(['update:error', 'load'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-list')
  const className = computed(() => {
    return cs(prefix.value)
  })
  const scrollStyles = computed(() => {
    return {
      height: `${height.value}px`,
      '--list-item-height': `${itemHeight.value}px`
    }
  })

  // 滚动阈值
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

  // 虚拟列表，每次加载新数据的数量
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
    if (!virtualList.value || loading.value) return
    const minStartIndex = 0
    const minEndIndex = pageSize.value

    // 起始索引和结束索引 -1
    startIndex.value = Math.max(startIndex.value - UPDATE_COUNT.value, minStartIndex)
    endIndex.value = Math.max(endIndex.value - UPDATE_COUNT.value, minEndIndex)
  }
  const handleScrollToLower = () => {
    if (finished.value || loading.value || error.value) return
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

  const handleClickError = () => {
    emit('update:error', false)
    emit('load')
  }

  const isScrollToTopShow = computed(() => {
    if (!showToTop.value) return false
    if (virtualList.value) {
      return endIndex.value >= data.value.length
    } else {
      return oldScrollTop.value > height.value
    }
  })
  const scrollToTop = () => {
    if (virtualList.value) {
      startIndex.value = 0
      endIndex.value = pageSize.value
    }
    scrollTop.value = oldScrollTop.value
    setTimeout(() => {
      scrollTop.value = 0
    }, 0)
  }
  // scroll into view
  const intoViewId = ref<WithId['id']>('')
  const scrollIntoView = (id: WithId['id']) => {
    if (virtualList.value) return
    intoViewId.value = id
  }

  onMounted(async () => {
    await updateListHeight()
  })

  defineExpose({
    scrollToTop,
    scrollIntoView
  })
</script>

<style lang="less">
  @import './index.less';
</style>
