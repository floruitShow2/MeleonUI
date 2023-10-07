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
        icon="ml-arrow-left"
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
          <MlIcon :icon="tool.icon" :color="tool.color" @click="switchToPage(tool)" />
        </template>

        <!-- <van-icon
          wx:for="{{toolBox}}"
          wx:key="index"
          wx:for-item="tool"
          class="van-icon"
          name="{{tool.icon}}"
          color="{{tool.color}}"
          bindtap="switchToPage"
          data-type="{{tool.type}}"
          data-delta="{{tool.delta}}"
          data-pageurl="{{tool.pageUrl}}"
        /> -->
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
        v-if="title"
        class="ml-navigator-title"
        :style="{
          left: `${sizes.screenWidth * 0.5}px`,
          lineHeight: `${sizes.customBarHeight}px`,
          color: `${titleColor}`
        }"
      >
        {{ title }}
      </view>
      <!-- 搜索 -->
      <view wx:else class="search" :style="{ height: `${sizes.customBarHeight}px` }">
        <slot name="search"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { onShow } from '@dcloudio/uni-app'
  import { generateDeviceUI } from '@/utils/device'
  import { cs } from '@/utils/property'
  import MlIcon from '../ml-icon/index.vue'
  import type { ToolType } from './type'

  const props = defineProps({
    // 导航栏背景色
    backgroundColor: { type: String, default: '#338cff' },
    // 导航栏标题
    title: { type: String, default: '' },
    // 导航栏颜色
    titleColor: { type: String, default: '#FFFFFF' }, //标题颜色
    // 是否返回按钮
    hasBack: {
      type: Boolean,
      default: false,
      observer(newVal: boolean) {
        if (newVal === undefined) newVal = true
        return newVal
      }
    },
    // 图标颜色
    iconColor: { type: String, default: '#555555' },
    // 是否靠顶
    isTop: { type: Boolean, default: false },
    // 功能箱，添加多个图标，默认功能为：通过提供目标路径 path 跳转到指定页面
    // icon => 基于 vant-ui 组件库，名称从文档提供中自选
    // color => 图标颜色
    // type => 类型限制为 return 和 navigator, 'return' 提供返回层数 delta，'navigator' 提供目标路径 path
    toolBox: { type: Array as PropType<ToolType[]>, default: () => [] }
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
    const { screenWidth, statusBarHeight, menuButtonWidth, customBarHeight } = generateDeviceUI().ui

    sizes.value = {
      screenWidth,
      statusBarHeight,
      menuButtonWidth,
      customBarHeight
    }

    const menuMessage = uni.getMenuButtonBoundingClientRect()
    menuPosition.value = {
      left: menuMessage.left,
      right: menuMessage.right
    }
  })

  // 类名生成
  const prefixCls = 'ml-navigator'
  const className = cs(prefixCls)

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
    console.log('aaa')
    uni.navigateBack({
      delta: 1
    })
  }

  const switchToPage = (tool: ToolType) => {
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
