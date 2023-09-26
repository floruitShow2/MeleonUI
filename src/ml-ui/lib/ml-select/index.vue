<template>
  <view :class="className" :style="themeColors">
    <!-- 多选模式 -->
    <view v-if="multiple" class="ws-select-tags" bindtap="startFocus">
      <!-- 多选模式 -->
      <!-- 模式一：tag 列表 -->
      <view v-if="!collapseTags && selectedList.length !== 0" class="ws-select__multiple-tags">
        <ws-tag
          v-for="item in selectedList"
          :key="item.value"
          class="ws-select__tag"
          size="mini"
          closable
          type="primary"
          text="{{selected.value}}"
          catch:close="deleteTag"
          >{{ item.label }}</ws-tag
        >
      </view>
      <!-- 模式二：单个 tag + 选中数量 - 1 -->
      <view
        v-if="collapseTags && selectedList.length !== 0"
        class="ws-select__multiple-tags collapse-tags"
      >
        <ws-tag
          class="ws-select__tag"
          size="mini"
          closable
          type="primary"
          :text="{{selectedList[0].value}}"
          catch:close="deleteTag"
        >
          {{ selectedList[0].label }}
        </ws-tag>
        <ws-tag v-if="selectedList.length > 1" class="ws-select__tag" size="mini" type="info">
          + {{ selectedList.length - 1 }}
        </ws-tag>
      </view>
    </view>
    <!-- 单选模式 -->
    <MlInput
      class="ws-input"
      :model-value="multiple && selectedList[0] ? '' : selectedList[0].label"
      type="text"
      :size="size"
      :height="multiple ? height : -1"
      :placeholder="multiple && selectedList.length !== 0 ? '' : placeholder"
      :disabled="!filterable"
      :is-overlay-show="disabled"
      @focus="startFocus"
      @blur="inputBlur"
    >
      <MlIcon
        slot="suffix-icon"
        :icon="isMenuUnfold ? 'ml-arrow-down' : 'ml-arrow-up'"
        color="#808080"
      />
    </MlInput>
    <scroll-view
      v-if="isMenuUnfold"
      class="select-menu"
      enable-flex="true"
      scroll-y="true"
      :style="menu_style"
    >
      <view
        v-for="option in options"
        :key="option.value"
        :class="['select-menu-item', option.disabled ? 'ws-select__option-disabled' : '', utils.generateSelectedRowStyle(multiple, selectedList, option.value)]"
        @click.stop="selectItem(option)"
      >
        {{ option.label }}
        <MlIcon class="ml-icon" icon="ml-success" />
      </view>
    </scroll-view>
    <view v-if="isMenuUnfold" class="select-menu-mask" @click.stop="inputBlur" />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, provide } from 'vue'
  import type { PropType } from 'vue'
  import type { BaseSelectProps } from './type'
  import MlInput from '../ml-input/index.vue'
  import { MlSelectGroupInjectionKey } from '../ml-option/context'
  import type { MlOptionProps } from '../ml-option/type'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'

  const props = defineProps({
    // select-menu relative
    width: {
      type: Number,
      value: 0
    },
    placeholder: { type: String, value: '请选择' },
    size: { type: String as PropType<BaseSelectProps['size']>, value: 'small' },
    multiple: { type: Boolean, default: false },
    collapseTags: { type: Boolean, default: false },
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
  const {} = toRefs(props)

  const emit = defineEmits([])

  const { themeColors } = useTheme()

  const prefix = 'ml-name'
  const className = computed(() => {
    return cs(prefix)
  })

  const optionsMap = ref<Map<number | string, MlOptionProps>>(new Map())
  const addOption = (id: string | number, option: MlOptionProps) => {
    optionsMap.value.set(id, option)
  }
  provide(MlSelectGroupInjectionKey, {
    addOption
  })
</script>

<style lang="less">
  @import './index.less';
</style>
