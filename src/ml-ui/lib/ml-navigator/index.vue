<template>
  <view :class="className" :style="baseStyle">
    <view
      class="nav-bar-content"
      :style="{
        width: `${menuPosition.left}px`,
        padding: `0 ${sizes.screenWidth - menuPosition.right}px`
      }"
    >
      <!-- 图标 -->
      <MlIcon
        v-if="hasBack"
        name="ml-arrow-left"
        :color="iconColor"
        :size="20"
        style="margin-right: 10px"
        @click="returnPrePage"
      />
      <view
        v-if="toolBox.length !== 0"
        class="ml-navigator-iconBg"
        :style="{
          height: `${sizes.customBarHeight}px`
        }"
      >
        <!--
          提供图标 名称 / 颜色 / 功能类型
              => 'return' : 返回的层数
              => 'navigator' : 跳转到指定路径
        -->
        <template v-for="tool in toolBox" :key="tool">
          <MlIcon :name="tool.icon" :color="tool.color" @click="switchToPage(tool)" />
        </template>
      </view>
      <view
        v-if="$slots.icon"
        class="ml-navigator-iconBg"
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
          color: `${titleColor}`
        }"
      >
        <slot v-if="$slots.default" />
        <text v-else>{{ title }}</text>
      </view>
      <!-- 搜索 -->
      <view v-if="$slots.search" class="search" :style="{ height: `${sizes.customBarHeight}px` }">
        <slot name="search"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { onShow } from '@dcloudio/uni-app'
  import { cs, generateDeviceUI } from '@meleon/uni-ui/utils'
  import type { NavigatorProps, NavigatorToolEntity } from './index.interface'
  import MlIcon from '../ml-icon/index.vue'

  const props = defineProps({
    // 导航栏背景色
    backgroundColor: { type: String, default: '#FFFFFF' },
    // 导航栏标题
    title: { type: String, default: '' },
    // 导航栏颜色
    titleColor: { type: String, default: '#FFFFFF' }, //标题颜色
    // 是否返回按钮
    hasBack: {
      type: Boolean,
      default: false
    },
    // 图标颜色
    iconColor: { type: String, default: '#555555' },
    // 是否靠顶
    isTop: { type: Boolean, default: false },
    // 功能箱，添加多个图标，默认功能为：通过提供目标路径 path 跳转到指定页面
    // icon => 基于 vant-ui 组件库，名称从文档提供中自选
    // color => 图标颜色
    // type => 类型限制为 return 和 navigator, 'return' 提供返回层数 delta，'navigator' 提供目标路径 path
    toolBox: { type: Array as PropType<NavigatorProps['toolBox']>, default: () => [] }
  })

  const { title, hasBack, toolBox, iconColor, backgroundColor } = toRefs(props)

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
  onShow(() => {
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
  const className = cs(prefix.value)

  // 样式生成
  const baseStyle = computed(() => {
    const { screenWidth, statusBarHeight, customBarHeight } = sizes.value
    return {
      width: `${screenWidth}px`,
      height: `${statusBarHeight + customBarHeight}px`,
      paddingTop: `${statusBarHeight}px`,
      backgroundColor: backgroundColor?.value
    }
  })

  const returnPrePage = () => {
    uni.navigateBack({
      delta: 1
    })
  }

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
