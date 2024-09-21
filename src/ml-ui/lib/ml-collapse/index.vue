<template>
  <view :class="className" :style="themeColors">
    <slot />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, reactive, computed, watch } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme, useIndexState, useMergeState } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import type { CollapseProps } from './index.interface'
  import { provide } from 'vue'
  import { collapseInjectionKey } from './context'

  const props = defineProps({
    // 非受控模式，无需传入 activeKey
    activeKeys: {
      type: Array as PropType<CollapseProps['activeKeys']>,
      default: undefined
    },
    defaultActiveKeys: {
      type: Array as PropType<CollapseProps['defaultActiveKeys']>,
      default: () => []
    },
    accordion: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    }
  })
  const { accordion, activeKeys, defaultActiveKeys, bordered } = toRefs(props)
  
  const { themeColors } = useTheme()
  const [localActiveKeys, setLocalActiveKey] = useMergeState(
    defaultActiveKeys.value,
    reactive({ value: activeKeys })
  )
  const { total, getIndexState } = useIndexState()

  const emit = defineEmits(['update:activeKeys', 'change'])

  const prefix = ref('ml-collapse')
  const className = computed(() => {
    return cs(prefix.value, {
      [`${prefix.value}--bordered`]: bordered.value
    })
  })

  const emitChange = (keys: CollapseProps['activeKeys']) => {
    emit('update:activeKeys', keys)
    emit('change', keys)
  }

  const handleCollapseItemClick = (key: string | number, e?: Event) => {
    let newKeys: Array<string | number> = []
    if (accordion.value) {
      newKeys = localActiveKeys.value.includes(key) ? [] : [key]
    } else {
      newKeys = [...localActiveKeys.value]
      const findIdx = newKeys.indexOf(key)
      if (findIdx > -1) {
        newKeys.splice(findIdx, 1)
      } else {
        newKeys.push(key)
      }
    }
    setLocalActiveKey(newKeys)
    emitChange(newKeys)
  }

  provide(
    collapseInjectionKey,
    reactive({
      activeKeys: localActiveKeys,
      total,
      getIndexState,
      handleClick: handleCollapseItemClick
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
