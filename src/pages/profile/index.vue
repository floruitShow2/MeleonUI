<template>
  <view :class="prefix">
    <ml-navigator
      :title="$t('profile.navigation.title')"
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view :class="`${prefix}-wrapper`" :style="wrapperStyle">
      <view :class="`${prefix}-wrapper-header`">
        <ml-avatar shape="circle" :size="44">
          <image src="@/assets/home/avatar.png" mode="widthFix" />
        </ml-avatar>
        <view class="header-message">
          <view class="username">
            Meleon
            <ml-tag
              model-value="@前端开发"
              type="primary"
              size="mini"
              plain
              :bordered="false"
            ></ml-tag>
          </view>
          <text class="description">Keep your face to the sunshine</text>
        </view>
        <ml-button type="primary" size="mini" shape="round">Edit</ml-button>
      </view>
      <!-- <view :class="`${prefix}-wrapper-statistics`">
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
      </view> -->
      <view :class="`${prefix}-wrapper-settings`">
        <view v-for="group in settingsGroup" :key="group.title" class="settings-group">
          <view class="settings-group-title">{{ $t(group.title) }}</view>
          <view
            v-for="setting in group.settings"
            :key="setting.key"
            class="settings-group-item"
            @click="() => handleSettingClick(setting)"
          >
            <view class="settings-group-item_left">
              <ml-icon :name="setting.icon" :size="22" style="transform: translateY(1px)" />
              <text class="title">{{ $t(setting.label) }}</text>
            </view>
            <view class="settings-group-item_right">
              <ml-icon name="ml-arrow-right" :size="16" style="transform: translateY(1px)" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <ml-tabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import type { SettingsGroupType, SettingItemType } from './interface'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight}px`
    }
  })
  const prefix = 'profile-view'

  // const statistics: Record<string, number> = {
  //   components: 10,
  //   echarts: 2,
  //   articles: 3,
  //   logs: 2
  // }

  const settingsGroup = ref<SettingsGroupType[]>([
    {
      title: 'profile.settings.group.general',
      settings: [
        {
          icon: 'ml-setting',
          label: 'profile.settings.lang',
          key: 'lang',
          path: '/pages/packageSettings/lang/index'
        }
        // {
        //   icon: 'ml-day',
        //   label: '主题',
        //   key: 'theme'
        // }
      ]
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
