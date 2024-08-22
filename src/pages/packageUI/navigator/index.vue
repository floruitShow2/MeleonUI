<template>
  <view class="uni_class">
    <ml-navigator
      v-if="!showCustomIcon"
      :title="title"
      :background="background"
    ></ml-navigator>
    <ml-navigator v-else :title="title" :background="background">
      <template #icon>
        <ml-icon name="ml-loading" color="#ffffff" :size="20"></ml-icon>
      </template>

      <template #default>
        <ml-input v-model="title" size="mini"></ml-input>
      </template>
    </ml-navigator>
    <view class="view-wrapper" :style="wrapperStyle">
      <code-block :code="docs[0].code">
        <template #title>
          <text>{{ docs[0].title }}</text>
        </template>
        <template #description>
          <text>
            {{ docs[0].desc }}
          </text>
        </template>
        <template #demo>
          <ml-input
            v-model="title"
            size="mini"
            placeholder="修改页面标题"
          ></ml-input>
        </template>
      </code-block>

      <code-block :code="docs[1].code">
        <template #title>
          <text>{{ docs[1].title }}</text>
        </template>
        <template #description>
          <text>
            {{ docs[1].desc }}
          </text>
        </template>
        <template #demo>
          <view class="btn-wrapper">
            <ml-button
              type="primary"
              size="small"
              @click="() => handleBackgroundChange(BgOperateEnum.PURE)"
            >
              设置纯色背景
            </ml-button>
            <ml-button
              type="primary"
              size="small"
              @click="() => handleBackgroundChange(BgOperateEnum.GRADIENT)"
            >
              设置渐变背景
            </ml-button>
            <ml-button
              type="primary"
              size="small"
              @click="() => handleBackgroundChange(BgOperateEnum.IMAGE)"
            >
              设置图片背景
            </ml-button>
          </view>
        </template>
      </code-block>

      <code-block :code="docs[2].code">
        <template #title>
          <text>{{ docs[2].title }}</text>
        </template>
        <template #description>
          <text>
            {{ docs[2].desc }}
          </text>
        </template>
        <template #demo>
          <view class="btn-wrapper">
            <ml-button
              type="primary"
              size="small"
              @click="handleToggleCustomIcon"
            >
              切换自定义导航栏
            </ml-button>
          </view>
        </template>
      </code-block>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import CodeBlock from '@/components/CodeBlock/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } =
      appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const docs = [
    {
      title: '基本使用',
      desc: '导航栏的基本使用。动态更新标题',
      code: `
<ml-navigator :title="title"></ml-navigator>

`
    },
    {
      title: '设置导航栏背景',
      desc: '支持纯色、渐变、图片背景',
      code: `
<ml-navigator
  :title="title"
  :background="background"
></ml-navigator>

const background = ref('#7A98B3')
enum BgOperateEnum {
  PURE = '1',
  GRADIENT = '2',
  IMAGE = '3'
}
const randomColors = [
  '#93AEC1',
  '#9DBDBA',
  '#F8B042',
  '#EC6A52',
  '#F3B7AD'
]
const curPureColorIdx = ref(0)
const handleBackgroundChange = (type: BgOperateEnum) => {
  const idx = curPureColorIdx.value === randomColors.length - 1 ? 0 : curPureColorIdx.value + 1
  curPureColorIdx.value = idx
  const val: Record<BgOperateEnum, string> = {
      [BgOperateEnum.PURE]: randomColors[curPureColorIdx.value],
      [BgOperateEnum.GRADIENT]: 'linear-gradient(90deg, #93AEC1 0%, #F3B7AD 100%)',
      [BgOperateEnum.IMAGE]: "url('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg')"
  }
  background.value = val[type]
}

`
    },
    {
      title: '自定义导航栏内容',
      desc: '支持通过 tools 或 插槽 形式自定义导航栏图标，标题内容也可以使用插槽自定义',
      code: `
<ml-navigator
  :title="title"
  :background="background"
>
  <template #icon>
    <ml-icon name="ml-loading" color="#ffffff" :size="20"></ml-icon>
  </template>

  <template #default>
    <ml-input v-model="title" size="mini"></ml-input>
  </template>
</ml-navigator>

`
    }
  ]

  // part 1
  const title = ref('ml-navigator')

  // part 2
  const background = ref('#7A98B3')
  enum BgOperateEnum {
    PURE = '1',
    GRADIENT = '2',
    IMAGE = '3'
  }
  const randomColors = ['#93AEC1', '#9DBDBA', '#F8B042', '#EC6A52', '#F3B7AD']
  const curPureColorIdx = ref(0)
  const handleBackgroundChange = (type: BgOperateEnum) => {
    const idx =
      curPureColorIdx.value === randomColors.length - 1
        ? 0
        : curPureColorIdx.value + 1
    curPureColorIdx.value = idx
    const val: Record<BgOperateEnum, string> = {
      [BgOperateEnum.PURE]: randomColors[curPureColorIdx.value],
      [BgOperateEnum.GRADIENT]:
        'linear-gradient(90deg, #93AEC1 0%, #F3B7AD 100%)',
      [BgOperateEnum.IMAGE]: `url('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg')`
    }
    background.value = val[type]
  }

  // part 2
  const showCustomIcon = ref(false)
  const handleToggleCustomIcon = () => {
    showCustomIcon.value = !showCustomIcon.value
  }
</script>

<style lang="less">
  @import './index.less';
</style>
