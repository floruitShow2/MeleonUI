<template>
  <view class="logger-view">
    <MlNavigator
      title="更新日志"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="logger-view-wrapper" :style="wrapperStyle">
      <view class="logger-view-wrapper_header">
        <text class="title">更新日志</text>
        <text class="desc">这里会有详细的功能更新及Bug修复记录</text>
      </view>
      <view class="logger-view-wrapper_list">
        <MlTimeline reverse>
          <MlTimelineItem v-for="log in logsData" :key="log.version">
            <template #label>
              <view class="item-header">
                <text class="item-header-version">{{ log.version }}</text>
                <text class="item-header-date">{{ formatToDate(log.date) }}</text>
              </view>
            </template>
            <view class="item-content">
              <view v-for="(list, k) in log.content" :key="k" class="section">
                <template v-if="list.length">
                  <view class="section-title">{{ logLabelMap[k] }}</view>
                  <view class="section-list">
                    <view
                      v-for="li in list"
                      :key="li.label"
                      class="section-list-item"
                      v-html="replaceHtml(li.label)"
                    >
                    </view>
                  </view>
                </template>
              </view>
            </view>
          </MlTimelineItem>
        </MlTimeline>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlTimeline from '@/ml-ui/lib/ml-timeline/index.vue'
  import MlTimelineItem from '@/ml-ui/lib/ml-timeline-item/index.vue'
  import { formatToDate } from '@/utils/time'
  import Logs from './constants/logs'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const logsData = reactive(Logs)
  const logLabelMap = {
    feature: '🆕 功能更新',
    optimize: '💎 功能优化',
    bugFix: '🐛 问题修复',
    style: '💅 样式更新'
  }

  const replaceHtml = (str: string) => {
    return str.replaceAll('<code>', '<code class="code">')
  }
</script>

<style lang="less">
  @import './index.less';
</style>
