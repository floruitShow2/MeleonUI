<template>
  <view :class="className" :style="themeColors">
    <view :class="`${prefix}--trigger`" @click="openPicker">
      <slot name="trigger" />
    </view>
    <Drawer
      v-model:visible="showPicker"
      placement="bottom"
      :height="500"
      :radius="10"
      :show-close="false"
      :show-footer="false"
    >
      <template #title>
        <view :class="`${prefix}--header`">
          <Icon name="ml-arrow-double-left" />
          <text>2024</text>
          <Icon name="ml-arrow-double-right" />
        </view>
      </template>
      <template #default> 默认内容 </template>
    </Drawer>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { usePickerHeader, useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import Drawer from '../ml-drawer/index.vue'
  import Icon from '../ml-icon/index.vue'
  import type { DatetimePickerProps } from './index.interface'
import { reactive } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String as PropType<DatetimePickerProps['modelValue']>,
      default: ''
    },
    defaultModelValue: {
      type: String as PropType<DatetimePickerProps['defaultModelValue']>,
      default: ''
    },
    mode: {
      type: String as PropType<DatetimePickerProps['mode']>,
      default: 'month'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  })
  const { modelValue, defaultModelValue, mode, format } = toRefs(props)

  const emit = defineEmits([])

  const { themeColors } = useTheme()

  const prefix = ref('ml-datetime-picker')
  const className = computed(() => {
    return cs(prefix.value, `${prefix.value}--${mode.value}`)
  })

  const localModelValue = computed(() => {})

  const {} = usePickerHeader(reactive(
    {
      mode: mode.value,
      modelValue: modelValue.value,
      defaultModelValue: defaultModelValue.value,
      format: format.value,
      onChange() {

      }
    }
  ))

  const showPicker = ref(false)
  const openPicker = () => {
    showPicker.value = true
  }
</script>

<style lang="less">
  @import './index.less';
</style>
