<template>
  <!-- <wxs src="../../wxs/theme.wxs" module="utils" /> -->
  <view :class="className" :style="themeColors">
    <view class="ml-input-title">
      <view :class="['ml-input-title__label', `is-${status}`]">{{ message[status] }}</view>
    </view>
    <view
      class="ml-input-wrapper"
      :animation="animationData"
      :style="{
        width: useVirtualInput && isOverlayShow ? ui.screenWidth - 20 + 'px' : '100%',
        zIndex: useVirtualInput && isOverlayShow ? 101 : 1
      }"
      @click="changeFocusStyle"
    >
      <view v-if="disabled && isOverlayShow" class="overlay" />
      <view v-if="prefixIcon.length !== 0" class="icon prefix-icon">
        <MlIcon v-if="prefixIcon.length !== 0" :name="prefixIcon" color="#808080" />
      </view>
      <view v-if="$slots['prefix']" class="icon prefix-icon">
        <slot name="prefix" />
      </view>
      <input
        :value="modelValue"
        :type="inputType"
        class="input"
        :focus="isFocus"
        :placeholder="placeholder"
        placeholder-class="ml-input-placeholder"
        :disabled="disabled"
        @focus="changeFocusStyle"
        @blur="changeBlurStyle"
        @input="onInput"
      />
      <view class="icon suffix-icon" @click="showPwd">
        <slot v-if="$slots['suffix']" name="suffix" />
        <MlIcon
          v-else-if="type === 'password'"
          :name="inputType !== 'password' ? 'ml-eye' : 'ml-eye-close'"
          color="#808080"
        />
        <MlIcon v-else-if="suffixIcon.length !== 0" :name="suffixIcon" color="#808080" />
      </view>
    </view>
    <view v-if="useVirtualInput && isOverlayShow" class="ml-virtual-overlay" @click.stop />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, getCurrentInstance, computed, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { onShow } from '@dcloudio/uni-app'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, generateDeviceUI, convertToNumber } from '@meleon/uni-ui/utils'
  import type { MlInputStatus } from './index.interface'
  import MlIcon from '../ml-icon/index.vue'

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    size: { type: String as PropType<Meleon.MlSize>, default: 'small' },
    type: { type: String, default: 'text' },
    useVirtualInput: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    placeholder: { type: String, default: '请输入' },
    prefixIcon: { type: String, default: '' },
    suffixIcon: { type: String, default: '' },
    autoFocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    message: { type: Object, default: () => ({ success: '密码格式正确', error: '密码格式错误' }) },
    validator: {
      type: Function as PropType<(v: string | number) => MlInputStatus>
    }
  })

  const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur'])

  const {
    modelValue,
    type,
    size,
    min,
    max,
    autoFocus,
    useVirtualInput,
    disabled,
    message,
    validator
  } = toRefs(props)

  const instance = getCurrentInstance()

  const prefix = ref('ml-input')

  const ui = ref<Record<string, number>>({
    screenWidth: 0,
    windowHeight: 0,
    statusBarHeight: 0,
    customBarHeight: 0
  })

  const className = computed(() => {
    return cs(prefix.value, [`${prefix.value}-${size.value}`], {
      'is-disabled': disabled.value,
      'is-focus': isFocus.value
    })
  })

  const { themeColors } = useTheme()

  onShow(() => {
    // 初始化 UI
    const { screenWidth, windowHeight, statusBarHeight, customBarHeight } = generateDeviceUI().ui
    ui.value = {
      screenWidth,
      windowHeight,
      statusBarHeight,
      customBarHeight
    }
  })
  onMounted(() => {
    // 初始化选中状态
    isFocus.value = autoFocus.value
    // 初始化输入框类型
    inputType.value = type.value
  })

  const isFocus = ref<boolean>(false)
  const isOverlayShow = ref<boolean>(false)

  const targetPosition = ref({
    left: 0,
    top: 0
  })
  const originPosition = ref({
    left: 0,
    top: 0,
    width: 0
  })
  const animationData = ref<any>({})

  const changeFocusStyle = (e: FocusEvent) => {
    if (disabled.value) {
      e.preventDefault()
      return
    }
    isFocus.value = true
    const { height: KeyboardHeight } = e.detail as unknown as { height: number }
    const { windowHeight } = ui.value
    const query = uni.createSelectorQuery().in(instance)
    query
      .select('.ml-input-wrapper')
      .boundingClientRect((data) => {
        const { left = 0, top = 0, height = 0, width = 0 } = Array.isArray(data) ? data[0] : data
        originPosition.value.width = width
        if (top + height * 2 >= windowHeight - KeyboardHeight && useVirtualInput.value) {
          targetPosition.value = {
            ...targetPosition.value,
            top: 20 + ui.value.statusBarHeight + ui.value.customBarHeight,
            left: 0
          }
          originPosition.value = {
            ...originPosition.value,
            left: left,
            top: top
          }

          const animation = uni.createAnimation({
            duration: 200
          })
          animation
            .translate(targetPosition.value.left - left, targetPosition.value.top - top)
            .width('100%')
            .step()

          isOverlayShow.value = true
          animationData.value = animation.export()
        }
      })
      .exec()
    emit('focus')
  }

  const onInput = (payload: Event) => {
    const e = payload.target as unknown as { value: string }
    emit('input', e.value)
    emit('update:modelValue', e.value)
  }

  const status = ref<MlInputStatus>('info')
  const changeBlurStyle = (e: FocusEvent) => {
    if (disabled.value) {
      e.preventDefault()
      return
    }
    let { value } = e.detail as unknown as { value: string | number }
    if (type.value === 'number') {
      const numMin = convertToNumber(min.value, 'lower')
      const numMax = convertToNumber(max.value, 'upper')
      const numValue = +modelValue.value
      if (numMin < numMax && modelValue.value !== '' && !isNaN(numValue)) {
        value = numValue < numMin ? numMin : numValue > numMax ? numMax : value
      }
    }
    // const numValue = +formatValue
    // let status: string = 'normal'
    if (validator?.value) {
      status.value = validator.value.call(instance, value)
    }
    // if (this.properties.funcList && this.properties.funcList.validator) {
    //   status = this.data.funcList.validator.call(this, formatValue)
    //   const borderColor = status === 'normal'
    //     ? '#808080'
    //     : status === 'success'
    //       ? this.data.themeColors?.successColor
    //       : this.data.themeColors?.errorColor
    //   this.setData({
    //     input_value: formatValue,
    //     resultStatus: status,
    //     borderColor
    //   })
    //   if (status !== '') {
    //     this.animate('.input-title', [
    //       { top: 0 }, { top: '-16px' }
    //     ], 200)
    //   }
    // } else {
    //   this.setData({
    //     borderColor: '#808080',
    //     input_value: formatValue
    //   })
    // }
    if (useVirtualInput.value) {
      const animation = uni.createAnimation({
        duration: 200
      })
      animation.translate(0, 0).width(originPosition.value.width).step()
      isOverlayShow.value = false
      animationData.value = animation.export()
    }
    isFocus.value = false
    emit('update:modelValue', value.toString())
    emit('blur', value)
  }

  const inputType = ref<string>('text')
  const showPwd = (e: MouseEvent) => {
    if (type.value !== 'password') return
    e.preventDefault()
    inputType.value = inputType.value === 'password' ? 'text' : 'password'
  }
</script>

<style lang="less">
  @import './index.less';
</style>
