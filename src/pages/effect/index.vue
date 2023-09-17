<template>
  <view class="effects">
    <MlNavigator
      title="动效库"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="effects-view" :style="wrapperStyle">
      <view class="effects-view-favorite">
        <swiper indicator-dots autoplay circular>
          <swiper-item class="swiper-item">aaa</swiper-item>
          <swiper-item class="swiper-item">bbb</swiper-item>
          <swiper-item class="swiper-item">ccc</swiper-item>
        </swiper>
      </view>
      <view class="effects-view-content">
        <view class="content-filter">
          <text>所有项目</text>
          <MlButton type="primary" size="mini">
            <template #icon>
              <MlIcon icon="ml-filter" :size="16" color="#ffffff" />
            </template>
            <text>筛选</text>
          </MlButton>
        </view>
        <view class="content-list">
          <EffectCard
            v-for="card in effectsList"
            :key="card.title"
            v-bind="card"
            style="width: 50%"
            @click="handleCardClick(card)"
          >
          </EffectCard>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
  import MlButton from '@/ml-ui/lib/ml-button/index.vue'
  import EffectCard from './components/EffectCard/index.vue'
  import type { EffectCardType } from './components/EffectCard/type'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const effectsList = ref<EffectCardType[]>([
    {
      title: 'Particle',
      author: 'Meleon',
      views: 11,
      likes: 12,
      url: '/pages/packageEffects/particle/index'
    },
    {
      title: 'Particle2',
      author: 'Meleon',
      views: 1,
      likes: 2,
      url: '/pages/packageEffects/particle/index'
    }
  ])

  const handleCardClick = (card: EffectCardType) => {
    uni.navigateTo({
      url: card.url
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
