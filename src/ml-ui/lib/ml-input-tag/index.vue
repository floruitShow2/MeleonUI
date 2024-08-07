<template>
  <view :class="className" :style="themeColors">
    <view v-if="$slots['prefix']" class="icon prefix-icon">
      <slot name="prefix" />
    </view>
    <span :class="`${prefix}-inner`" @click="onInputFocus">
      <MlTag
        v-for="(tag, index) in tags"
        :key="tag.value"
        :class="`${prefix}-inner_tag`"
        :size="size"
        :closable="tag.closable"
        bordered
        :type="tagType"
        :model-value="tag.label"
        @close.stop="(e) => handleDeleteTag(e, index)"
      />
      <input
        :class="`${prefix}-inner_input`"
        type="text"
        v-model="inputValue"
        :focus="isFocus"
        :style="inputStyle"
        :disabled="disabled || readonly"
        @focus="onInputFocus"
        @input="onInputChange"
        @blur="onInputBlur"
        @confirm="onInputConfirm"
      />
    </span>
    <view class="icon suffix-icon">
      <slot v-if="$slots['suffix']" name="suffix" />
      <!-- <MlIcon v-else-if="suffixIcon.length !== 0" :name="suffixIcon" color="#808080" /> -->
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import { getValueData } from './utils'
  import type { TagData, InputTagProps } from './index.interface'
  import MlTag from '../ml-tag/index.vue'

  const DEFAULT_FIELD_NAMES = {
    value: 'value',
    label: 'label',
    closable: 'closable',
    tagProps: 'tagProps'
  }

  const props = defineProps({
    modelValue: {
      type: Array as PropType<Array<TagData | TagData['value']>>,
      default: () => []
    },
    defaultValue: {
      type: Array as PropType<(string | number | TagData)[]>,
      default: () => []
    },
    maxTagCount: {
      type: Number,
      default: 0
    },
    fieldNames: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({})
    },
    size: {
      type: String as PropType<InputTagProps['size']>,
      default: 'small'
    },
    tagType: {
      type: String as PropType<InputTagProps['tagType']>,
      default: 'primary'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const { modelValue, defaultValue, size, disabled, readonly, maxTagCount, tagType } = toRefs(props)
  const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change', 'remove'])

  const { themeColors } = useTheme()
  const prefix = ref('ml-input-tag')

  const className = computed(() => {
    return cs(prefix.value, [`${prefix.value}-${size.value}`], {
      [`${prefix.value}--disabled`]: disabled.value,
      [`${prefix.value}--actived`]: isActive.value
    })
  })

  const inputStyle = ref<Record<string, any>>({
    width: '12px'
  })
  const setInputWidth = (width: number) => {
    if (width > 20) {
      inputStyle.value.width = `${width}px`
    } else {
      inputStyle.value.width = '20px'
    }
  }

  const _value = ref(defaultValue.value)
  const inputValue = ref('')

  const mergedFieldNames = computed(() => ({
    ...DEFAULT_FIELD_NAMES,
    ...props.fieldNames
  }))
  const computedValue = computed(() => modelValue.value ?? _value.value)
  const valueData = computed(() => getValueData(computedValue.value))
  const tags = computed(() => {
    if (maxTagCount.value > 0) {
      const invisibleTags = valueData.value.length - maxTagCount.value
      if (invisibleTags > 0) {
        const result = valueData.value.slice(0, maxTagCount.value)
        const raw = {
          value: '__meleon__more',
          label: `+${invisibleTags}...`,
          closable: false
        }
        result.push({
          ...raw
        })
        console.log(maxTagCount.value, result)
        return result
      }
    }
    return valueData.value
  })

  const updateValue = (value: Array<string | number | TagData>) => {
    _value.value = value
    emit('update:modelValue', _value.value)
    emit('change', _value.value)
  }

  const handleDeleteTag = (e: string, index: number) => {
    const newValue = computedValue.value.filter((_, i) => i !== index)
    updateValue(newValue)
    emit('remove', e)
  }

  // input 响应事件
  const isFocus = ref(false)
  const isActive = ref(false)
  const onInputFocus = (e: FocusEvent) => {
    if (disabled.value) return
    isFocus.value = true
    isActive.value = true
    emit('focus', e)
  }
  const onInputChange = (e: Event) => {
    const { value } = e.target as unknown as { value: string }
    setInputWidth(value.length * 16)
  }
  const onInputBlur = (e: FocusEvent) => {
    if (disabled.value || !e) return
    if (readonly.value) {
      isFocus.value = false
      isActive.value = false
      return
    }
    if (e && e.preventDefault) e.preventDefault()
    isActive.value = false
    if (!readonly.value) emit('blur', e)
  }
  const onInputConfirm = (e: InputEvent) => {
    if (disabled.value) return
    if (e && e.preventDefault) e.preventDefault()
    const val = (e.target as any)?.value
    if (val) {
      updateValue([...computedValue.value, val])
      inputValue.value = ''
    }
  }

  defineExpose({
    toggleActive(active: boolean) {
      isActive.value = active
    },
    blur: onInputBlur
  })
</script>

<style lang="less">
  @import './index.less';
</style>
