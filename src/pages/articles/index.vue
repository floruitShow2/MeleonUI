<template>
  <view class="category-view">
    <MlNavigator title-color="#FFFFFF" icon-color="#FFFFFF" background-color="#7A98B3">
      <template #search>
        <MlInput readonly size="mini" style="width: 100%" @focus="handleSearchFocus">
          <template #prefix>
            <MlIcon icon="ml-search" :size="14" />
          </template>
        </MlInput>
      </template>
    </MlNavigator>
    <view class="category-view-wrapper" :style="wrapperStyle">
      <MlTabs active="threejs">
        <template #right>
          <MlIcon icon="ml-filter" :size="18" @click="handleTabFilter" />
        </template>
        <MlTab v-for="(articles, tab) in articlesList" :key="tab" :value="tab" :title="tab">
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            v-bind="article"
            @click="handleCardClick"
          />
        </MlTab>
      </MlTabs>
    </view>
    <MlTabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlTabbar from '@/ml-ui/lib/ml-tabbar/index.vue'
  import MlTabs from '@/ml-ui/lib/ml-tabs/index.vue'
  import MlTab from '@/ml-ui/lib/ml-tab/index.vue'
  import MlInput from '@/ml-ui/lib/ml-input/index.vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
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
