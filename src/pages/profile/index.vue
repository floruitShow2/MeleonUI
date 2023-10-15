<template>
  <view :class="prefix">
    <MlNavigator
      :title="$t('profile.navigation.title')"
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view :class="`${prefix}-wrapper`" :style="wrapperStyle">
      <view :class="`${prefix}-wrapper-header`">
        <MlAvatar shape="circle" :size="44">
          <image src="@/assets/home/avatar.png" mode="widthFix" />
        </MlAvatar>
        <view class="header-message">
          <text class="username">Meleon</text>
          <text class="description">Keep your face to the sunshine</text>
        </view>
        <MlButton type="primary" size="mini" shape="round">Edit</MlButton>
      </view>
      <view :class="`${prefix}-wrapper-statistics`">
        <view v-for="(v, k) in statistics" :key="k" class="statistic-item">
          <MlCountTo
            :from="0"
            :to="v"
            animation
            :animation-duration="1000"
            :style="{ fontSize: '20px', color: '#555555' }"
          />
          <text class="statistic-item-label">{{ $t(`profile.statistics.${k}`) }}</text>
        </view>
      </view>
      <view :class="`${prefix}-wrapper-card`"></view>
      <view :class="`${prefix}-wrapper-settings`">
        <view
          v-for="setting in settings"
          :key="setting.key"
          class="setting-item"
          @click="() => handleSettingClick(setting)"
        >
          <view class="setting-item_left">
            <MlIcon :icon="setting.icon" :size="22" style="transform: translateY(1px)" />
            <text class="title">{{ setting.label }}</text>
          </view>
          <view class="setting-item_right">
            <MlIcon icon="ml-arrow-right" :size="16" style="transform: translateY(1px)" />
          </view>
        </view>
      </view>
    </view>
    <MlTabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlTabbar from '@/ml-ui/lib/ml-tabbar/index.vue'
  import MlAvatar from '@/ml-ui/lib/ml-avatar/index.vue'
  import MlButton from '@/ml-ui/lib/ml-button/index.vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
  import MlCountTo from '@/ml-ui/lib/ml-count-to/index.vue'
  import type { SettingItemType } from './interface'
  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight}px`
    }
  })
  const prefix = 'profile-view'

  const statistics: Record<string, number> = {
    components: 10,
    echarts: 2,
    articles: 3,
    logs: 2
  }

  const settings = ref<SettingItemType[]>([
    {
      icon: 'ml-setting',
      label: '多语言',
      key: 'lang',
      path: '/pages/packageSettings/lang/index'
    },
    {
      icon: 'ml-day',
      label: '主题',
      key: 'theme'
    }
  ])
  const handleSettingClick = (item: SettingItemType) => {
    if (!item.path) return
    uni.navigateTo({
      url: item.path
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
