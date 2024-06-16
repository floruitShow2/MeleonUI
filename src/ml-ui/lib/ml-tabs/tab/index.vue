<template>
  <view :class="className" :style="themeColors" @click.self="() => handleTabClick(tab)">
    <MlIcon
      v-if="tab.icon"
      :icon="tab.icon"
      :size="16"
      :color="iconColor"
      style="transform: translateY(1px)"
    />
    <span :class="`${prefix}-title`">
      <slot />
    </span>
    <MlIcon
      v-if="tab.closable"
      icon="ml-close"
      :size="18"
      :color="iconColor"
      style="transform: translateY(1px)"
      @click="handleCloseClick(tab)"
    />
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import MlIcon from '../../ml-icon/index.vue'
  import useTheme from '../../../hooks/useTheme/useTheme'
  import { cs } from '../../../utils/property'
  import type { TabData } from '../../ml-tab/type'

  const props = defineProps({
    tab: {
      type: Object as PropType<TabData>,
      required: true
    },
    active: {
      type: [String, Number],
      required: true
    }
  })

  const { tab, active } = toRefs(props)

  const emit = defineEmits(['click', 'remove'])
  const { themeColors } = useTheme()

  const prefix = 'ml-tabs-tab'
  const className = computed(() => {
    return cs(prefix, {
      [`${prefix}-disabled`]: tab.value.disabled || false,
      [`${prefix}-active`]: tab.value.value === active.value
    })
  })

  const iconColor = computed(() => {
    const { value: key, disabled } = tab.value
    if (disabled) return themeColors.value['--info-color-7']
    if (key === active.value) return themeColors.value['--primary-color-6']
    return themeColors.value['--info-color-9']
  })

  const handleTabClick = (selectTab: TabData) => {
    if (!tab.value.disabled) emit('click', selectTab)
  }

  const handleCloseClick = (selectTab: TabData) => {
    if (!tab.value.disabled) emit('remove', selectTab)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
