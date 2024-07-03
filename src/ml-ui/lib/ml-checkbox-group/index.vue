<template>
  <view :class="className">
    <slot />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, provide, reactive } from 'vue'
  import type { PropType } from 'vue'
  import { useDeepClone, cs } from '@meleon/uni-ui/index'
  import { checkboxGroupInjectionKey } from './context'
  import type { CheckboxGroupProps } from './index.interface'

  const props = defineProps({
    checkedList: {
      type: Array as PropType<Array<string | number>>,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
    direction: {
      type: String as PropType<CheckboxGroupProps['direction']>,
      default: 'horizontal'
    },
    mode: {
      type: String as PropType<CheckboxGroupProps['mode']>,
      default: 'single'
    }
  })
  const { checkedList, min, max, mode, direction } = toRefs(props)

  const emit = defineEmits(['update:checkedList'])

  const prefix = ref('ml-checkbox-group')
  const className = computed(() => {
    return cs(prefix.value, `${prefix.value}--${direction.value}`)
  })

  const totalList = ref<Array<string | number>>([])
  // 传递给 ml-checkbox 的组件，
  const initTotalList = (value: string | number) => {
    totalList.value = [...new Set([...totalList.value, value])]
    updateDisabledList(checkedList.value)
  }

  const disabledList = ref<Array<string | number>>([])
  const updateDisabledList = (list: Array<string | number>) => {
    const len = list.length
    if (len >= max.value) {
      disabledList.value = totalList.value.filter((li) => !list.includes(li))
    } else if (len === min.value) {
      disabledList.value = list
    } else {
      disabledList.value = []
    }
  }
  // 更新 checkedList
  const updateCheckedList = (value: string | number) => {
    let list = useDeepClone(checkedList.value)
    if (mode.value === 'single') list = list[0] === value ? [] : [value]
    else {
      const findIdx = list.findIndex((li) => li === value)
      if (findIdx !== -1) {
        list.splice(findIdx, 1)
      } else {
        list = totalList.value.filter((li) => list.includes(li) || li === value)
      }
      updateDisabledList(list)
    }
    emit('update:checkedList', list)
  }

  provide(
    checkboxGroupInjectionKey,
    reactive({
      getCheckedList: () => checkedList.value,
      getDisabledList: () => disabledList.value,
      getMin: () => min.value,
      getMax: () => max.value,
      initTotalList,
      updateCheckedList
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
