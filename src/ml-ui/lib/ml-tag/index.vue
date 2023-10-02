<template>
  <view
    v-if="!isEditing"
    :class="className"
    :hover-class="checkable && hoverClassName"
    :style="themeColors"
    @click="handleTagClick"
  >
    <slot name="icon"></slot>
    <text :class="`${prefix}-content`">{{ modelValue }}</text>
    <MlIcon
      v-if="closable"
      class="icon"
      icon="ml-close"
      :size="mapIconSize[size]"
      style="transform: translateY(1px)"
      @click.stop="handleHideTag"
    />
  </view>
  <MlInput
    v-else
    v-model:model-value="copiedValue"
    :size="size"
    auto-focus
    style="display: inline-flex; width: 80px"
    @blur="handleModelValueBlur"
  />
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import MlIcon from '../ml-icon/index.vue'
  import MlInput from '../ml-input/index.vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'

  const props = defineProps({
    type: { type: String as PropType<MlDesign.Type>, default: 'info' },
    size: { type: String as PropType<MlDesign.Size>, default: 'small' },
    modelValue: { type: String, required: true },
    plain: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    checkable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false }
  })
  const { modelValue, type, size, closable, checkable, editable, plain, bordered } = toRefs(props)

  const emit = defineEmits(['update:modelValue', 'click', 'close'])

  const { themeColors } = useTheme()
  const prefix = 'ml-tag'
  const className = computed(() => {
    return cs(prefix, [`${prefix}-${type.value}`, `${prefix}-${size.value}`], {
      [`${prefix}-closable`]: closable.value,
      [`${prefix}-plain`]: plain.value,
      [`${prefix}-bordered`]: bordered.value
    })
  })
  const hoverClassName = computed(() => {
    return cs([`${prefix}-${type.value}-hover`])
  })

  const mapIconSize: Record<string, number> = {
    mini: 12,
    small: 14,
    medium: 16,
    large: 18
  }
  const isEditing = ref<boolean>(false)

  const handleTagClick = () => {
    if (editable.value) {
      isEditing.value = true
    } else {
      emit('click', modelValue.value)
    }
  }

  const handleHideTag = () => {
    emit('close', modelValue.value)
  }

  const copiedValue = ref(modelValue.value)
  const handleModelValueBlur = (e: any) => {
    isEditing.value = false
    emit('update:modelValue', e)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
