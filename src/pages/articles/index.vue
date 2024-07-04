<template>
  <view class="category-view">
    <ml-navigator title-color="#FFFFFF" icon-color="#FFFFFF" background="#7A98B3">
      <template #search>
        <ml-input readonly size="mini" style="width: 100%" @focus="handleSearchFocus">
          <template #prefix>
            <ml-icon name="ml-search" :size="14" />
          </template>
        </ml-input>
      </template>
    </ml-navigator>
    <view class="category-view-wrapper" :style="wrapperStyle">
      <ml-tabs active="threejs">
        <template #right>
          <ml-icon name="ml-filter" :size="18" @click="handleTabFilter" />
        </template>
        <ml-tab v-for="(articles, tab) in articlesList" :key="tab" :value="tab" :title="tab">
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            v-bind="article"
            @click="handleCardClick"
          />
        </ml-tab>
      </ml-tabs>
    </view>
    <ml-tabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import ArticleCard from '@/components/category/ArticleCard/index.vue'
  import ThreejsList from './articlesList/threejs'
  import VueList from './articlesList/vue'
  import DesignPatternList from './articlesList/designPattern'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight}px`
    }
  })

  const articlesList = ref<Record<string, Articles.ArticleCard[]>>({
    threejs: ThreejsList,
    vue: VueList,
    pattern: DesignPatternList
  })

  const handleSearchFocus = () => {
    console.log('search focused')
  }
  const handleTabFilter = () => {
    uni.navigateTo({
      url: `/pages/packageArticles/category/index`
    })
  }
  const handleCardClick = (e: string | number) => {
    uni.navigateTo({
      url: `/pages/packageArticles/detail/index?id=${e}`
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
