<template>
  <view class="home-view">
    <ml-config-provider :themes="themes">
      <!-- 消息提示 -->
      <ml-message ref="messageRef" />
      <!-- 导航栏 -->
      <ml-navigator
        :title="$t('home.navigation.title')"
        title-color="#FFFFFF"
        background="#7A98B3"
      >
        <!-- <image class="image" src="../../assets/home/MeleonUI.png" mode="aspectFit" /> -->
      </ml-navigator>
      <!-- 主体 -->
      <view
        class="home-view-content"
        :style="{
          width: `${ui.screenWidth}px`,
          height: `${ui.contentHeight}px`
        }"
      >
        <view class="home-view-content_hero">
          <view class="tagline">
            <text>MeleonUI</text>
            <text>微信小程序前端组件库</text>
          </view>
          <view class="desc"> {{ $t('home.hero.desc') }} </view>
          <view class="actions">
            <ml-button
              type="primary"
              @click="onNavigate('/pages/componentList/index')"
            >
              {{ $t('home.actions.start') }}
              <ml-icon name="ml-arrow-right--line" color="#FFFFFF" />
            </ml-button>
            <!-- <MlButton
              type="secondary"
              status="normal"
              @click="copyLinkUrl('https://github.com/floruitShow2/MeleonUI')"
            >
              <template #icon>
                <MlIcon name="ml-github" />
              </template>
              Github
            </MlButton> -->
            <MlButton
              type="secondary"
              status="normal"
              @click="onNavigate('/pages/packageHome/logger/index')"
            >
              {{ $t('home.actions.logger') }}
            </MlButton>
          </view>
          <!-- <view class="sub-actions">
            <view class="current-version">
              当前版本:
              <text>{{ '1.0.6' }}</text>
            </view>
            <MlButton type="text" @click="onNavigate('/pages/packageHome/logger/index')">
              更新日志
            </MlButton>
            <MlButton type="text" disabled> 项目说明 </MlButton>
          </view> -->
        </view>
        <view class="home-view-content_features">
          <view
            v-for="feature in features"
            :key="feature.title"
            class="feature"
          >
            <view class="feature-header">
              {{ feature.title }}
            </view>
            <view class="feature-desc">
              {{ feature.desc }}
            </view>
          </view>
        </view>
        <!-- <view class="home-view-content_copyrights">
          <text>Released under the MIT License.</text>
          <text>Copyright © 2023-present Meleon</text>
        </view> -->
      </view>
      <!-- 分页栏 -->
      <ml-tabbar />
    </ml-config-provider>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { useAppStore } from '@/store'
  import type { ConfigProviderProps, MessageInstance } from '@meleon/uni-ui'

  const appStore = useAppStore()

  const themes: ConfigProviderProps['themes'] = {}

  const ui = computed(() => {
    return appStore.appSize
  })

  const messageRef = ref<MessageInstance>()

  const onNavigate = (url: string) => {
    uni.navigateTo({ url })
  }

  const copyLinkUrl = (url: string) => {
    uni.setClipboardData({
      data: url,
      showToast: false,
      success: () => {
        // 显示自定义提示
        if (messageRef.value) {
          messageRef.value.primary({
            content: 'github 链接已复制，可前往浏览器打开',
            duration: 3000
          })
        }
        uni.hideToast()
      }
    })
  }

  // onMounted(async () => {
  //   uni.request({
  //     url: 'http://localhost:3000/api/user/login',
  //     method: 'POST',
  //     data: {
  //       username: 'meleon',
  //       password: '232000'
  //     },
  //     complete: (res) => {
  //       console.log(res)
  //     }
  //   })
  // })

  const features = reactive([
    {
      title: '功能丰富',
      desc: '目前已实现 20+ 个功能组件的基本功能编写，后续不定期更新组件或功能'
    },
    {
      title: '开箱即用',
      desc: '在 API 风格上，MeleonUI 与市面上常见 Web 端组件库的 API 风格基本保持一致，上手容易，无需负担额外的学习成本'
    },
    {
      title: '类型安全',
      desc: '使用 Typescript 编写，开发时可自动推断类型，为用户提供更好的开发体验'
    },
    {
      title: '可扩展性',
      desc: '保证组件功能的最小粒度，开发者可根据不同的业务需求，自由组合或二次封装组件'
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
