<template>
  <view class="button-view">
    <ml-navigator
      title="ml-drawer"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="button-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text> 基础用法，绑定 visible 属性控制 drawer 的显示/隐藏 </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="templateMap[0].modelVisible = true">
              打开弹窗
            </ml-button>
            <ml-drawer v-model:visible="templateMap[0].modelVisible" />
          </view>
        </template>
      </CodeBlock>
      <!-- placement -->
      <CodeBlock :code="templateMap[1].code">
        <template #title>
          <text>方向</text>
        </template>
        <template #description>
          <view>设置 placement 属性控制 drawer 的弹出方向。</view>
          <view>设置 hasNav 属性，默认为 true，告诉组件当前页面是否包含导航栏</view>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="() => handlePlacement('right')">right</ml-button>
            <ml-button type="primary" @click="() => handlePlacement('left')">left</ml-button>
            <ml-button type="primary" @click="() => handlePlacement('top')">top</ml-button>
            <ml-button type="primary" @click="() => handlePlacement('bottom')">bottom</ml-button>
            <ml-checkbox v-model:checked="hasNav">hasNav</ml-checkbox>
            <ml-drawer
              v-model:visible="templateMap[1].modelVisible"
              :placement="block2Placement"
              :has-nav="hasNav"
            />
          </view>
        </template>
      </CodeBlock>
      <!-- 插槽 -->
      <CodeBlock :code="templateMap[2].code">
        <template #title>
          <text>控制插槽</text>
        </template>
        <template #description>
          <text> 使用插槽控制 drawer 各个部分的内容 </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" size="small" @click="templateMap[2].modelVisible = true">
              click me
            </ml-button>
            <ml-drawer v-model:visible="templateMap[2].modelVisible">
              <template #title>自定义标题</template>
              <text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, dolor libero
                blanditiis distinctio commodi totam recusandae aliquam fugit officiis sequi
                perspiciatis non animi, eaque facilis sed reiciendis in aut vel.
              </text>
              <template #footer>
                <ml-button>自定义页脚</ml-button>
              </template>
            </ml-drawer>
          </view>
        </template>
      </CodeBlock>
      <!-- 按钮尺寸 -->
      <CodeBlock :code="templateMap[3].code">
        <template #title>
          <text>按钮状态</text>
        </template>
        <template #description>
          <text>
            按钮状态分为 warning, danger, success 三种，可以与按钮类型同时生效，优先级高于按钮类型。
          </text>
        </template>
        <template #demo>
          <view class="drawer-container">
            <view>监听到：{{ listenedEvent }}事件</view>
            <ml-button type="primary" size="mini" @click="templateMap[3].modelVisible = true">
              click me
            </ml-button>
            <ml-drawer
              v-model:visible="templateMap[3].modelVisible"
              @ok="listenedEvent = 'ok'"
              @close="listenedEvent = 'close'"
            >
              <text>监听到：{{ listenedEvent }}事件</text>
            </ml-drawer>
          </view>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import CodeBlock from '@/components/CodeBlock/index.vue'

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
      modelVisible: false,
      code: `
<ml-drawer v-model:visible="templateMap[0].modelVisible" />

`
    },
    {
      modelVisible: false,
      code: `
<ml-drawer
  v-model:visible="templateMap[1].modelVisible"
  :placement="block2Placement"
  :has-nav="hasNav"
/>      

`
    },
    {
      modelVisible: false,
      code: `
<ml-drawer v-model:visible="templateMap[2].modelVisible">
  <template #title>自定义标题</template>
  <text>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, dolor libero
    blanditiis distinctio commodi totam recusandae aliquam fugit officiis sequi
    perspiciatis non animi, eaque facilis sed reiciendis in aut vel.
  </text>
  <template #footer>
    <ml-button>自定义页脚</ml-button>
  </template>
</ml-drawer>

`
    },
    {
      modelVisible: false,
      code: `
<ml-drawer
  v-model:visible="templateMap[3].modelVisible"
  @ok="listenedEvent = 'ok'"
  @close="listenedEvent = 'close'"
>
  <text>监听到：{{ listenedEvent }}事件</text>
</ml-drawer>

`
    }
  ])

  type Placement = 'left' | 'right' | 'top' | 'bottom'
  const block2Placement = ref<Placement>('right')
  const handlePlacement = (direction: Placement) => {
    block2Placement.value = direction
    templateMap.value[1].modelVisible = true
  }
  const hasNav = ref<boolean>(true)
  const listenedEvent = ref('')
</script>

<style lang="less">
  @import './index.less';
</style>
