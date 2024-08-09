<template>
  <div :class="`${prefixCls}-header`">
    <div :class="getIconClassName(showSuperPrev)" @click="onSuperPrev">
      <template v-if="showSuperPrev">
        <Icon name="ml-arrow-double-left" :size="24" />
      </template>
    </div>
    <div :class="getIconClassName(showPrev)" @click="onPrev">
        <template v-if="showPrev">
            <Icon name="ml-arrow-left" :size="24" />
        </template>
    </div>
    <view :class="`${prefixCls}-header-title`">
        <template v-if="onLabelClick && (localYear || localMonth)">
            <span v-if="localYear">{{ localYear }}</span>
            <span v-if="localYear && localMonth">-</span>
            <span v-if="localMonth">{{ localMonth }}</span>
        </template>
        <template v-else>{{ title }}</template>
    </view>
    <div :class="getIconClassName(showNext)" @click="onNext">
        <template v-if="showNext">
            <Icon name="ml-arrow-right" :size="24" />
        </template>
    </div>
    <div :class="getIconClassName(showSuperNext)" @click="onSuperNext">
        <template v-if="showSuperNext">
            <Icon name="ml-arrow-double-right" :size="24" />
        </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { toRefs, type PropType, computed } from 'vue'
  import type { Dayjs } from 'dayjs'
  import Icon from '@meleon/uni-ui/lib/ml-icon/index.vue'
  import type { HeaderLabelClickFunc } from '../index.interface'
  import { isFunction } from '@meleon/uni-ui/utils'

  type ClickCallbackFunc = (payload: MouseEvent) => void

  const props = defineProps({
    prefixCls: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Object as PropType<Dayjs>
    },
    mode: {
      type: String as PropType<MeleonDatetime.DateMode>,
      default: 'date'
    },
    onPrev: {
      type: Function as PropType<ClickCallbackFunc>
    },
    onSuperPrev: {
      type: Function as PropType<ClickCallbackFunc>
    },
    onNext: {
      type: Function as PropType<ClickCallbackFunc>
    },
    onSuperNext: {
      type: Function as PropType<ClickCallbackFunc>
    },
    onLabelClick: {
      type: Function as PropType<HeaderLabelClickFunc>
    }
  })

  const {
    prefixCls,
    mode,
    value: modelValue,
    onPrev,
    onSuperPrev,
    onNext,
    onSuperNext
  } = toRefs(props)
  const showPrev = computed(() => isFunction(onPrev?.value))
  const showSuperPrev = computed(() => isFunction(onSuperPrev?.value))
  const showNext = computed(() => isFunction(onNext?.value))
  const showSuperNext = computed(() => isFunction(onSuperNext?.value))

  const localYear = computed(() => {
    return ['date', 'month', 'week'].includes(mode.value) && modelValue?.value
      ? modelValue.value.format('YYYY')
      : ''
  })
  const localMonth = computed(() => {
    return ['date', 'week'].includes(mode.value) && modelValue?.value
      ? modelValue.value.format('MM')
      : ''
  })

  const getIconClassName = (show?: boolean) => [
    `${prefixCls.value}-header-icon`,
    {
      [`${prefixCls.value}-header-icon-hidden`]: !show
    }
  ]
</script>

<style scoped lang="less"></style>
