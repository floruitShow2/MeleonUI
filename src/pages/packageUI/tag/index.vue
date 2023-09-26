<template>
  <view class="tag-view">
    <MlNavigator
      title="MeleonUI"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="tag-view-wrapper" :style="wrapperStyle">
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>标签的基本用法</text>
        </template>
        <template #demo>
          <MlTag model-value="标签1" />
          <MlTag model-value="标签2" />
          <MlTag model-value="标签3" />
          <MlTag model-value="标签4" closable />
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>标签的类型包括 info | primary | success | warning | danger 四种，默认为 info</text>
        </template>
        <template #demo>
          <view class="tags-container">
            <MlTag model-value="标签1" />
            <MlTag model-value="标签2" type="primary" />
            <MlTag model-value="标签3" type="success" />
            <MlTag model-value="标签4" type="warning" />
            <MlTag model-value="标签5" type="danger" />
          </view>
          <view class="tags-container">
            <MlTag model-value="标签1" plain />
            <MlTag model-value="标签2" type="primary" plain />
            <MlTag model-value="标签3" type="success" plain />
            <MlTag model-value="标签4" type="warning" plain />
            <MlTag model-value="标签5" type="danger" plain />
          </view>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>标签的尺寸</text>
        </template>
        <template #description>
          <text
            >标签的大小分为：mini、small、medium、large
            四种，可以在不同场景下选择合适按钮尺寸。默认尺寸为 small</text
          >
        </template>
        <template #demo>
          <MlTag model-value="标签1" size="mini" />
          <MlTag model-value="标签2" size="small" />
          <MlTag model-value="标签3" size="medium" />
          <MlTag model-value="标签4" size="large" />
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[3].templateCode">
        <template #title>
          <text>带图标的标签</text>
        </template>
        <template #description>
          <text>可通过 icon 插槽在标签中加入图标。</text>
        </template>
        <template #demo>
          <MlTag model-value="标签1">
            <template #icon>
              <MlIcon icon="ml-donework" :size="14" />
            </template>
          </MlTag>
          <MlTag model-value="标签2">
            <template #icon>
              <MlIcon icon="ml-mark" :size="14" />
            </template>
          </MlTag>
          <MlTag model-value="标签3">
            <template #icon>
              <MlIcon icon="ml-delete" :size="14" />
            </template>
          </MlTag>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[4].templateCode">
        <template #title>
          <text>标签交互事件</text>
        </template>
        <template #description>
          <view>closeable: 添加 ml-close 图标，点击可触发 close 事件</view>
          <view>checkable: 添加点击样式，触发 click 事件</view>
          <view>editable: 点击后标签会切换成 input 输入框，可修改标签内容 </view>
        </template>
        <template #demo>
          <MlTag model-value="标签1" closable @close="hanldeTagClose" />
          <MlTag model-value="标签2" checkable @click="hanldeTagClick" />
          <MlTag v-model:model-value="tagValue" editable />
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import CodeBlock from '@/components/CodeBlock/index.vue'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlTag from '@/ml-ui/lib/ml-tag/index.vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const templateMap = ref([
    {
      templateCode: `<MlTag model-value="标签1" />
<MlTag model-value="标签2" />
<MlTag model-value="标签3" />
<MlTag model-value="标签4" closable />`
    },
    {
      templateCode: `<view class="tags-container">
  <MlTag model-value="标签1" />
  <MlTag model-value="标签2" type="primary" />
  <MlTag model-value="标签3" type="success" />
  <MlTag model-value="标签4" type="warning" />
  <MlTag model-value="标签5" type="danger" />
</view>
<view class="tags-container">
  <MlTag model-value="标签1" plain />
  <MlTag model-value="标签2" type="primary" plain />
  <MlTag model-value="标签3" type="success" plain />
  <MlTag model-value="标签4" type="warning" plain />
  <MlTag model-value="标签5" type="danger" plain />
</view>`
    },
    {
      templateCode: `<MlTag model-value="标签1" size="mini" />
<MlTag model-value="标签2" size="small" />
<MlTag model-value="标签3" size="medium" />
<MlTag model-value="标签4" size="large" />`
    },
    {
      templateCode: `<MlTag model-value="标签1">
  <template #icon>
    <MlIcon icon="ml-donework" :size="14" />
  </template>
</MlTag>
<MlTag model-value="标签2">
  <template #icon>
    <MlIcon icon="ml-mark" :size="14" />
  </template>
</MlTag>
<MlTag model-value="标签3">
  <template #icon>
    <MlIcon icon="ml-delete" :size="14" />
  </template>
</MlTag>`
    },
    {
      templateCode: `<MlTag model-value="标签1" closable @close="hanldeTagClose" />
<MlTag model-value="标签2" checkable @click="hanldeTagClick" />
<MlTag v-model:model-value="tagValue" editable />

const tagValue = ref('可编辑内容')
const hanldeTagClose = (value: string) => {
  uni.showToast({
    title: \`close 事件：\${value}\`,
    icon: 'none'
  })
}
const hanldeTagClick = (value: string) => {
  uni.showToast({
    title: \`click 事件：\${value}\`,
    icon: 'none'
  })
}
`
    }
  ])

  const tagValue = ref('可编辑内容')
  const hanldeTagClose = (value: string) => {
    uni.showToast({
      title: `close 事件：${value}`,
      icon: 'none'
    })
  }
  const hanldeTagClick = (value: string) => {
    uni.showToast({
      title: `click 事件：${value}`,
      icon: 'none'
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
