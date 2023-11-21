<template>
  <view :class="className" :style="themeColors">
    <!-- 多选模式 -->
    <template v-if="multiple">
      <MlInputTag
        ref="mlInputTagRef"
        v-model:model-value="selectedLabel"
        :class="`${prefix}-input`"
        :size="size"
        :max-tag-count="maxTagCount"
        @focus="onInputFocus"
        @remove="onInputTagRemove"
        @blur="onInputBlur"
      >
        <template #suffix>
          <MlIcon :icon="isMenuUnfold ? 'ml-arrow-down' : 'ml-arrow-up'" color="#808080" />
        </template>
      </MlInputTag>
    </template>
    <!-- 单选模式 -->
    <template v-else>
      <MlInput
        ref="mlInputRef"
        v-model:modelValue="inputValue"
        :class="`${prefix}-input`"
        type="text"
        :readonly="!filterable"
        :size="size"
        :disabled="disabled"
        :placeholder="formatPlaceholder"
        @focus="onInputFocus"
        @input="onInputChange"
        @blur="onInputBlur"
      >
        <template #suffix>
          <MlIcon :icon="isMenuUnfold ? 'ml-arrow-down' : 'ml-arrow-up'" color="#808080" />
        </template>
      </MlInput>
    </template>
    <scroll-view
      v-if="isMenuUnfold"
      :class="`${prefix}-dropdown`"
      enable-flex="true"
      scroll-y="true"
      :animation="menuAnimationData"
      :style="menuStyle"
    >
      <slot />
      <!-- <view
        v-for="option in options"
        :key="option.value"
        :class="[`${prefix}-dropdown-item`, option.disabled ? `${prefix}__option-disabled` : '']"
        @click.stop="handleSelectItem(option)"
      >
        {{ option.label }}
        <MlIcon class="ml-icon" icon="ml-success" />
      </view> -->
    </scroll-view>
    <view v-if="isMenuUnfold" :class="`${prefix}-menu-mask`" @click.stop="onInputBlur" />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, provide, getCurrentInstance, onMounted, watch } from 'vue'
  import type { PropType } from 'vue'
  import type { BaseSelectProps, Direction } from './type'
  import MlInput from '../ml-input/index.vue'
  import MlInputTag from '../ml-input-tag/index.vue'
  import MlIcon from '../ml-icon/index.vue'
  import { MlSelectGroupInjectionKey } from '../ml-option/context'
  import type { MlOptionProps } from '../ml-option/type'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import { getRect, generateDeviceUI } from '../../utils/rect'

  const props = defineProps({
    // select-menu relative
    modelValue: {
      type: [String, Array] as PropType<MlOptionProps['value'] | MlOptionProps['value'][]>,
      required: true
    },
    width: {
      type: Number,
      value: 0
    },
    placeholder: { type: String, default: '请选择' },
    size: { type: String as PropType<BaseSelectProps['size']>, value: 'small' },
    multiple: { type: Boolean, default: false },
    maxTagCount: { type: Number, default: 0 },
    filterable: { type: Boolean, default: false },
    disabled: {
      type: Boolean,
      default: false
    },
    addToParent: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String,
      value: ''
    }
  })
  const { modelValue, placeholder, filterable, multiple, maxTagCount, disabled, addToParent } =
    toRefs(props)

  const emit = defineEmits(['update:model-value'])
  const mlInputRef = ref()
  const mlInputTagRef = ref()

  const { themeColors } = useTheme()

  const deviceUI = ref<Record<string, number>>({})

  const prefix = 'ml-select'
  const className = computed(() => {
    return cs(prefix)
  })
  const formatPlaceholder = computed(() => {
    if (multiple.value) return placeholder.value
    if (filterable.value && isMenuUnfold.value && selectedList.value[0]) {
      return selectedList.value[0].label
    }
    return placeholder.value
  })

  onMounted(() => {
    // 初始化设备尺寸
    deviceUI.value = generateDeviceUI().ui
  })

  // options 映射
  const optionsMap = ref<Map<number | string | symbol, MlOptionProps>>(new Map())
  const options = computed(() => {
    return Array.from(optionsMap.value.values())
  })
  const addOption = (option: MlOptionProps) => {
    optionsMap.value.set(option.value, option)
    initSelectedList(modelValue.value)
  }
  const selectOption = (option: MlOptionProps) => {
    const findIdx = selectedList.value.findIndex((item) => item.value === option.value)
    if (findIdx !== -1) {
      selectedList.value.splice(findIdx, 1)
    } else {
      selectedList.value = multiple.value ? [...selectedList.value, option] : [option]
    }
    emit('update:model-value', selectedValue.value)
  }

  const selectedList = ref<MlOptionProps[]>([])
  const selectedLabel = ref<string[]>([])

  watch(
    selectedList,
    (newVal) => {
      selectedLabel.value = newVal.map((item) => item.label)
    },
    { deep: true }
  )

  const selectedValue = computed(() => {
    const res = selectedList.value.map((item) => item.value)
    return multiple.value ? res : res[0]
  })
  // 初始化绑定值
  const inputValue = ref('')
  const initSelectedList = (values: MlOptionProps['value'] | MlOptionProps['value'][]) => {
    selectedList.value = []
    const arr = !Array.isArray(values) ? [values] : values
    arr.forEach((item) => {
      const findOption = optionsMap.value.get(item)
      if (findOption) {
        selectedList.value.push(findOption)
      }
    })
    handleInputValue()
  }
  const handleInputValue = () => {
    inputValue.value = !multiple.value && selectedList.value[0] ? selectedList.value[0].label : ''
  }
  watch(
    modelValue,
    (newVal) => {
      initSelectedList(newVal)
    },
    { deep: true, immediate: true }
  )

  const inputRefWidth = ref(150)
  provide(MlSelectGroupInjectionKey, {
    getSelectedList: () => selectedList.value,
    getHiddenList: () => hiddenList.value,
    getTriggerRect: () => ({
      width: inputRefWidth.value
    }),
    addOption,
    selectOption
  })

  const isMenuUnfold = ref<boolean>(false)
  const menuStyle = ref('')
  const menuDirection = ref<Direction>('top')
  const handleSelectItem = (option: MlOptionProps) => {}
  const handleDeleteTag = () => {}

  // 下拉菜单动画
  const menuAnimationData = ref<any>({})
  const executeMenuAnimate = (time: number, direction: Direction) => {
    const animation = uni.createAnimation({
      duration: time,
      timingFunction: 'linear',
      transformOrigin: `${direction} center`
    })
    animation.scaleY(1).opacity(1).step()
    menuAnimationData.value = animation.export()
  }
  // 计算下拉菜单位置信息
  const instance = getCurrentInstance()
  const computeMenuPosition = async () => {
    const resStyle: Record<string, any> = {}
    const inputRes = await getRect(instance, `.${prefix}-input`)
    const menuRes = await getRect(instance, `.${prefix}-dropdown`)
    if (!inputRes || !menuRes) {
      console.log('节点不存在，获取节点数据失败')
      return
    }
    let { top: i_top, height: i_height, width: i_width, bottom: i_bottom, left: i_left } = inputRes
    const { height: m_height } = menuRes
    let bottom = deviceUI.value.screenHeight
    let stylestr = ''
    // if (parentRes[0] === null) bottom = deviceUI.value.screenHeight
    // else bottom = parentRes[0].bottom
    if (bottom - i_bottom <= m_height) {
      if (addToParent.value) resStyle.top = -m_height - 5
      else resStyle.top = i_top - m_height - 5
      menuDirection.value = 'bottom'
    } else {
      if (addToParent.value) resStyle.top = i_height + 5
      else resStyle.top = i_top + i_height + 5
      menuDirection.value = 'top'
    }
    resStyle.left = i_left
    resStyle.width = i_width
    inputRefWidth.value = i_width
    Object.keys(resStyle).forEach((item) => {
      stylestr += `${item}: ${resStyle[item]}px;`
    })
    menuStyle.value = stylestr

    // if (invokeAnimation !== undefined || invokeAnimation === false) return
    executeMenuAnimate(200, menuDirection.value)
  }

  // filterable 筛选不符合条件的选项
  const hiddenList = ref<Array<MlOptionProps['value']>>([])
  const handleSearch = (query: MlOptionProps['value']) => {
    hiddenList.value = options.value
      .filter((option) => {
        if (typeof option.value === 'string') {
          return option.label.indexOf(query.toString()) === -1
        } else {
          return option.label !== query
        }
      })
      .map((option) => option.value)
  }

  const currentRef = computed(() => {
    return multiple.value ? mlInputTagRef.value : mlInputRef.value
  })
  const onInputFocus = () => {
    isMenuUnfold.value = true
    hiddenList.value = []
    computeMenuPosition()
  }
  const onInputChange = (e: string) => {
    if (filterable.value) {
      handleSearch(e)
    }
  }
  const onInputBlur = () => {
    const animation = uni.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      transformOrigin: `${menuDirection.value} center`
    })
    animation.scaleY(0).opacity(0).step()
    menuAnimationData.value = animation.export()
    currentRef.value.onInputBlur()
    setTimeout(() => {
      isMenuUnfold.value = false
      handleInputValue()
      emit('update:model-value', selectedValue.value)
    }, 200)
  }
  const onInputTagRemove = () => {
    selectedList.value = selectedList.value.filter((item) =>
      selectedLabel.value.includes(item.label)
    )
  }
</script>

<style lang="less">
  @import './index.less';
</style>
