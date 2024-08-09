<template>
  <view :class="className" :style="baseStyle">
    <view
      :class="`${prefix}-bar`"
      :style="{
        width: `${menuPosition.left}px`,
        padding: `0 ${sizes.screenWidth - menuPosition.right}px`
      }"
    >
      <!-- 图标 -->
      <template v-if="!$slots.icon">
        <view
          :class="`${prefix}-bar-icons`"
          :style="{
            height: `${sizes.customBarHeight}px`
          }"
        >
          <template v-for="tool in currentIcons" :key="tool">
            <MlIcon
              :name="tool.icon"
              :color="tool.color || iconColor"
              :size="26"
              @click="switchToPage(tool)"
            />
          </template>
        </view>
      </template>
      <view
        v-else
        :class="`${prefix}-bar-icons`"
        :style="{
          height: `${sizes.customBarHeight}px`
        }"
      >
        <slot name="icon"></slot>
      </view>
      <!-- 标题 -->
      <view
        class="ml-navigator-title"
        :style="{
          left: `${sizes.screenWidth * 0.5}px`,
          lineHeight: `${sizes.customBarHeight}px`,
          color: title,
          ...titleStyle
        }"
      >
        <slot v-if="$slots.default" />
        <text v-else>{{ title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { cs, generateDeviceUI } from '@meleon/uni-ui/utils'
  import type { NavigatorProps, NavigatorToolEntity } from './index.interface'
  import MlIcon from '../ml-icon/index.vue'

  const props = defineProps({
    background: {
      type: String,
      default: 'var(--primary-color-6)'
    },
    title: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: '#FFFFFF'
    },
    titleStyle: {
      type: Object as PropType<NavigatorProps['titleStyle']>,
      default: () => ({})
    },
    hasBack: {
      type: Boolean,
      default: true
    },
    iconColor: {
      type: String,
      default: '#FFFFFF'
    },
    iconStyle: {
      type: Object as PropType<NavigatorProps['iconStyle']>,
      default: () => ({})
    },
    // 功能箱，添加多个图标，默认功能为：通过提供目标路径 path 跳转到指定页面
    // icon => 基于 vant-ui 组件库，名称从文档提供中自选
    // color => 图标颜色
    // type => 类型限制为 return 和 navigator, 'return' 提供返回层数 delta，'navigator' 提供目标路径 path
    tools: {
      type: Array as PropType<NavigatorProps['tools']>,
      default: () => []
    }
  })

  const { title, hasBack, iconColor, tools, background } = toRefs(props)

  const sizes = ref({
    screenWidth: 0,
    statusBarHeight: 0,
    menuButtonWidth: 0,
    customBarHeight: 0
  })
  const menuPosition = ref({
    left: 0,
    right: 0
  })
  onMounted(() => {
    const { ui, menuButton } = generateDeviceUI()
    const { screenWidth, statusBarHeight, menuButtonWidth, customBarHeight } = ui

    sizes.value = {
      screenWidth,
      statusBarHeight,
      menuButtonWidth,
      customBarHeight
    }

    menuPosition.value = {
      left: menuButton.left,
      right: menuButton.right
    }
  })

  // 类名生成
  const prefix = ref('ml-navigator')
  const className = computed(() => {
    return cs(prefix.value)
  })

  // 样式生成
  const baseStyle = computed(() => {
    const { screenWidth, statusBarHeight, customBarHeight } = sizes.value
    return {
      width: `${screenWidth}px`,
      height: `${statusBarHeight + customBarHeight}px`,
      paddingTop: `${statusBarHeight}px`,
      background: background.value
    }
  })

  const currentIcons = computed<NavigatorToolEntity[]>(() => {
    return hasBack.value
      ? [
          {
            icon: 'ml-arrow-left',
            color: iconColor.value,
            type: 'return',
            delta: 1
          },
          ...tools.value
        ]
      : [...tools.value]
  })

  const switchToPage = (tool: NavigatorToolEntity) => {
    const { type, delta, path } = tool
    if (type === 'return' && delta) {
      uni.navigateBack({
        delta: Number(delta)
      })
    } else if (type === 'navigator' && path) {
      uni.navigateTo({
        url: path
      })
    }
  }
</script>

<style lang="less">
  @import './index.less';
</style>
