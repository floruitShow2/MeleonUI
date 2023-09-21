<template>
  <slot v-if="globalCtx && globalCtx.activeKey === key" />
</template>

<script setup lang="ts">
  import { toRefs, inject, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { MlTabsGroupInjectionKey } from './context'

  const props = defineProps({
    value: {
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
    },
    closable: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String as PropType<`ml-${string}`>,
      default: ''
    }
  })

  const { value: key, title, disabled, closable, icon } = toRefs(props)

  const globalCtx = inject(MlTabsGroupInjectionKey)

  onMounted(() => {
    if (globalCtx) {
      globalCtx.addTabItem(key.value, {
        value: key.value,
        title: title.value,
        disabled: disabled.value,
        closable: closable.value,
        icon: icon.value
      })
    }
  })
</script>

<style lang="less">
  @import './index.less';
</style>
