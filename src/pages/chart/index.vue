<template>
  <view :class="prefix">
    <MlNavigator
      title="图表库"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view :class="`${prefix}-container`" :style="wrapperStyle">
      <view
        v-for="icon in iconsList"
        :key="icon.name"
        :class="`${prefix}-container-card`"
        @click="() => handleEchartsClick(icon.name)"
      >
        <MlColorIcon :name="icon.fontClass" :size="44" />
        <text class="card-label">{{ icon.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import EchartsIcon from '@/common/echarts.icon'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlColorIcon from '@/ml-ui/lib/ml-colorIcon/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })
  const prefix = 'echarts-view'

  const iconsList = computed(() => {
    return EchartsIcon.glyphs
      .filter((item) => item.name.indexOf('echarts') !== -1)
      .map((item) => ({ name: item.name, fontClass: `ml-${item.font_class}` }))
  })

  const handleEchartsClick = (name: string) => {
    uni.navigateTo({
      url: `/pages/packageChart/detail/index?id=${name}`
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
