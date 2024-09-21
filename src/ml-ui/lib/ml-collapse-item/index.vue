<template>
  <view :class="className" :style="themeColors">
    <!-- header -->
    <view :class="headerCls">
      <IconSwitcher
        :class="`${prefix}-header-switcher`"
        :default-switched="isActive"
        :disabled="disabled"
        prev-icon="ml-arrow-right--fill"
        next-icon="ml-arrow--fill"
        @change="onSwitcherClick"
      />
      <view :class="`${prefix}-header-title`">{{ title }}</view>
    </view>
    <!-- content -->
    <view :class="contentCls">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, onMounted, inject } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import IconSwitcher from '../ml-icon-switcher/index.vue'
  import { collapseInjectionKey } from '../ml-collapse/context'

  const props = defineProps({
    prop: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const { prop, disabled } = toRefs(props)

  const emit = defineEmits([])

  const collapseCtx = inject(collapseInjectionKey, null)

  const { themeColors } = useTheme()

  const prefix = ref('ml-collapse-item')
  const className = computed(() => {
    return cs(prefix.value)
  })
  const headerCls = computed(() => {
    return cs(`${prefix.value}-header`, {
      [`${prefix.value}-header--disabled`]: disabled.value,
      [`${prefix.value}-header--no-bordered`]: isLast.value && !isActive.value
    })
  })
  const contentCls = computed(() => {
    return cs(`${prefix.value}-content`, {
      [`${prefix.value}-content--active`]: isActive.value
    })
  })

  const collapseIndex = ref(-1)
  onMounted(() => {
    if (collapseCtx) {
      collapseIndex.value = collapseCtx.getIndexState()
    }
  })

  const isActive = computed(() =>
    (collapseCtx?.activeKeys || []).includes(prop.value)
  )
  const isLast = computed(() => {
    return collapseCtx ? collapseIndex.value === collapseCtx.total : false
  })
  const onSwitcherClick = () => {
    if (disabled.value) return
    collapseCtx && collapseCtx.handleClick(prop.value)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
