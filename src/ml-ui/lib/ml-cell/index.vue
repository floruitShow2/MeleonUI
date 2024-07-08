<template>
  <view :class="className" :style="{ ...themeColors }" @click="handleCellClick">
    <!-- text cell -->
    <template v-if="type === CellTypeEnum.TEXT">
      <view :class="`${prefix}--left`">
        <slot name="label">
          <text :class="`${prefix}-label`">{{ label }}</text>
          <text :class="`${prefix}-desc`">{{ description }}</text>
        </slot>
      </view>
      <view :class="cs(`${prefix}--right`)">
        <template v-if="isEditing">
          <Input
            :class="`${prefix}-input`"
            :model-value="afterValue?.toString()"
            auto-focus
            size="mini"
            @blur="handleValueChange"
          />
        </template>
        <template v-else>
          <slot name="value">
            <text :class="`${prefix}-val`">{{ afterValue }}</text>
          </slot>
        </template>
        <template v-if="!$slots.value && allowEdit && !isEditing">
          <Icon name="ml-edit" color="var(--info-color-7)" @click="handleEditClick" />
        </template>
      </view>
    </template>
    <!-- button cell -->
    <template v-else-if="type === CellTypeEnum.BUTTON">
      <!-- remark: 用 Button 作为标签的话会和默认组件冲突，需要换个名字 -->
      <MlButton type="text" size="mini" :status="btnStatus" @click="handleBtnClick">
        {{ label }}
      </MlButton>
    </template>
    <!-- navigator cell -->
    <template v-else-if="type === CellTypeEnum.NAV">
      <view :class="`${prefix}--left`">
        <slot name="label">
          <text :class="`${prefix}-label`">{{ label }}</text>
          <text :class="`${prefix}-desc`">{{ description }}</text>
        </slot>
      </view>
      <view :class="cs(`${prefix}--right`)">
        <slot name="value">
          <text :class="`${prefix}-val`">{{ afterValue }}</text>
        </slot>
        <slot name="rightIcon">
          <Icon name="ml-arrow-right" color="var(--info-color-7)" />
        </slot>
      </view>
    </template>
    <template v-else-if="type === CellTypeEnum.SWITCH">
      <view :class="`${prefix}--left`">
        <slot name="label">
          <text :class="`${prefix}-label`">{{ label }}</text>
          <text :class="`${prefix}-desc`">{{ description }}</text>
        </slot>
      </view>
      <view :class="cs(`${prefix}--right`)">
        <Switch :model-value="!!afterValue" :disabled="disabled" @change="handleValueChange" />
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, onMounted, inject } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, useDeepClone } from '@meleon/uni-ui/utils'
  import { CellTypeEnum, type CellProps, type CellChangePayload } from './index.interface'
  import Icon from '../ml-icon/index.vue'
  import Input from '../ml-input/index.vue'
  import MlButton from '../ml-button/index.vue'
  import Switch from '../ml-switch/index.vue'
  import { cellGroupInjectionKey } from '../ml-cell-group/context'

  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    value: {
      type: String as PropType<CellProps['value']>,
      default: ''
    },
    type: {
      type: String as PropType<CellProps['type']>,
      default: CellTypeEnum.TEXT
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowEdit: {
      type: Boolean,
      default: false
    },
    btnStatus: {
      type: String as PropType<CellProps['btnStatus']>,
      default: 'normal'
    },
    url: {
      type: String,
      default: ''
    }
  })
  const { type, label, description, value: modelValue, disabled, url } = toRefs(props)

  /**
   * @description textCell 编辑后，switchCell 切换后触发 change 事件
   */
  const emit = defineEmits(['change', 'btnClick', 'navigate'])

  const globalCtx = inject(cellGroupInjectionKey, null)
  const idx = ref(-1)
  onMounted(() => {
    if (!globalCtx) {
      idx.value = -1
    } else {
      idx.value = globalCtx.getCellGroupItemIndex()
    }
  })

  const { themeColors } = useTheme()

  const prefix = ref('ml-cell')
  const className = computed(() => {
    return cs(prefix.value, `${prefix.value}-${type.value}`, {
      [`${prefix.value}--disabled`]: disabled.value,
      [`${prefix.value}--bordered`]: idx.value !== globalCtx?.total.value
    })
  })

  const afterValue = ref(modelValue.value)
  watch(modelValue, (newVal) => {
    afterValue.value = newVal
  })

  const isEditing = ref<boolean>(false)
  const handleEditClick = () => {
    isEditing.value = true
  }
  const handleValueChange = (val: string) => {
    isEditing.value = false
    afterValue.value = val
    emit('change', { value: val, cell: useDeepClone(props) } as CellChangePayload)
  }

  const handleBtnClick = () => {
    emit('btnClick', { cell: useDeepClone(props) })
  }

  const handleCellClick = () => {
    if (type.value === CellTypeEnum.NAV) {
      uni.navigateTo({
        url: url.value,
        fail() {
          uni.switchTab({
            url: url.value
          })
        }
      })
      // emit('navigate', { cell: useDeepClone(props) })
    }
  }
</script>

<style scoped lang="less">
  @import './index.less';
</style>
