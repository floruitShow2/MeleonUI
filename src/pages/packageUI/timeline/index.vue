<template>
  <view class="timeline-view">
    <MlNavigator
      title="MlTimeline"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="timeline-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>{{ templateMap[0].title }}</text>
        </template>
        <template #description>
          <text>{{ templateMap[0].desc }}</text>
        </template>
        <template #demo>
          <view class="timeline-container">
            <MlCheckboxGroup v-model:checked-list="reverseCheckedList" mode="single">
              <MlCheckbox value="reverse">reverse</MlCheckbox>
              <MlCheckbox value="not-reverse">not reverse</MlCheckbox>
            </MlCheckboxGroup>
            <MlTimeline :reverse="reverseCheckedList[0] === 'reverse'">
              <MlTimelineItem>
                <template #label>
                  <text>2023-09-08</text>
                </template>
                <view>The first milestone content</view>
              </MlTimelineItem>
              <MlTimelineItem>
                <template #label>
                  <text>2023-09-09</text>
                </template>
                <view>
                  <view>The second milestone</view>
                  <view>The second milestone</view>
                  <view>The second milestone</view>
                </view>
              </MlTimelineItem>
              <MlTimelineItem>
                <template #label>
                  <text> 2023-09-25 </text>
                </template>
                <view>The third milestone </view>
              </MlTimelineItem>
            </MlTimeline>
          </view>
        </template>
      </CodeBlock>
      <!-- 自定义节点样式 -->
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>{{ templateMap[1].title }}</text>
        </template>
        <template #description>
          <text>{{ templateMap[1].desc }}</text>
        </template>
        <template #demo>
          <view class="timeline-container">
            <MlTimeline>
              <MlTimelineItem dot-color="skyblue">
                <template #label>
                  <text>2023-09-08</text>
                </template>
                <view>The first milestone content</view>
              </MlTimelineItem>
              <MlTimelineItem dot-color="var(--warning-color-6)">
                <template #label>
                  <text>2023-09-09</text>
                </template>
                <view>
                  <view>The second milestone</view>
                  <view>The second milestone</view>
                  <view>The second milestone</view>
                </view>
              </MlTimelineItem>
              <MlTimelineItem dot-color="#FF0000">
                <template #label>
                  <view class="timeline-label">
                    <text> 2023-09-25 </text>
                    <MlIcon icon="ml-day" color="red"> </MlIcon>
                  </view>
                </template>
                <view>The third milestone </view>
              </MlTimelineItem>
            </MlTimeline>
          </view>
        </template>
      </CodeBlock>
      <!-- 自定义节点 -->
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>{{ templateMap[2].title }}</text>
        </template>
        <template #description>
          <text>{{ templateMap[2].desc }}</text>
        </template>
        <template #demo>
          <view class="timeline-container">
            <MlTimeline>
              <MlTimelineItem dot-color="skyblue" line-type="dotted">
                <template #label>
                  <text>2023-09-08</text>
                </template>
                <template #dot>
                  <MlIcon icon="ml-selection--circle" color="var(--primary-color-6)" />
                </template>
                <view>The first milestone content</view>
              </MlTimelineItem>
              <MlTimelineItem dot-color="var(--warning-color-6)" line-type="dashed">
                <template #label>
                  <text>2023-09-09</text>
                </template>
                <template #dot>
                  <MlIcon icon="ml-info--circle" color="var(--info-color-7)" />
                </template>
                <view>
                  <view>The second milestone</view>
                  <view>The second milestone</view>
                  <view>The second milestone</view>
                </view>
              </MlTimelineItem>
              <MlTimelineItem dot-color="#FF0000">
                <template #label>
                  <view class="timeline-label">
                    <text> 2023-09-25 </text>
                    <MlIcon icon="ml-day" color="red"> </MlIcon>
                  </view>
                </template>
                <template #dot>
                  <MlIcon icon="ml-close--circle" color="var(--danger-color-6)" />
                </template>
                <view>The third milestone </view>
              </MlTimelineItem>
            </MlTimeline>
          </view>
        </template>
      </CodeBlock>
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[3].templateCode">
        <template #title>
          <text>{{ templateMap[3].title }}</text>
        </template>
        <template #description>
          <text>{{ templateMap[3].desc }}</text>
        </template>
        <template #demo>
          <view class="timeline-container">
            <MlCheckboxGroup v-model:checked-list="modeCheckedList" mode="single">
              <MlCheckbox value="left">left</MlCheckbox>
              <MlCheckbox value="right">right</MlCheckbox>
              <MlCheckbox value="alternate">alternate</MlCheckbox>
            </MlCheckboxGroup>
            <MlTimeline :mode="modeCheckedList[0] || 'left'">
              <MlTimelineItem>
                <template #label>
                  <text>2023-09-08</text>
                </template>
                <view>The first milestone content</view>
              </MlTimelineItem>
              <MlTimelineItem style="width: 100%">
                <template #label>
                  <text>2023-09-09</text>
                </template>
                <view>
                  <view>The second milestone</view>
                  <view>The second milestone</view>
                  <view>The second milestone</view>
                </view>
              </MlTimelineItem>
              <MlTimelineItem>
                <template #label>
                  <text> 2023-09-25 </text>
                </template>
                <view>The third milestone </view>
              </MlTimelineItem>
            </MlTimeline>
          </view>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import CodeBlock from '@/components/CodeBlock/index.vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
  import MlCheckbox from '@/ml-ui/lib/ml-checkbox/index.vue'
  import MlCheckboxGroup from '@/ml-ui/lib/ml-checkbox-group/index.vue'
  import MlTimeline from '@/ml-ui/lib/ml-timeline/index.vue'
  import MlTimelineItem from '@/ml-ui/lib/ml-timeline-item/index.vue'

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
      title: '基本使用',
      desc: '基本使用',
      templateCode: `
<MlCheckboxGroup v-model:checked-list="checked" mode="single">
  <MlCheckbox value="reverse">reverse</MlCheckbox>
  <MlCheckbox value="not-reverse">not reverse</MlCheckbox>
</MlCheckboxGroup>
<MlTimeline :reverse="checked[0] === 'reverse'">
  <MlTimelineItem>
    <template #label>
      <text>2023-09-08</text>
    </template>
    <view>The first milestone content</view>
  </MlTimelineItem>
  <MlTimelineItem>
    <template #label>
      <text>2023-09-09</text>
    </template>
    <view>
      <view>The second milestone</view>
      <view>The second milestone</view>
      <view>The second milestone</view>
    </view>
  </MlTimelineItem>
  <MlTimelineItem>
    <template #label>
      <text> 2023-09-25 </text>
    </template>
    <view>The third milestone </view>
  </MlTimelineItem>
</MlTimeline>
      `
    },
    {
      title: '自定义节点内容',
      desc: '自定义节点内容，可控制节点颜色和标题区域内容',
      templateCode: `<MlTimeline>
<MlTimelineItem dot-color="skyblue">
  <template #label>
    <text>2023-09-08</text>
  </template>
  <view>The first milestone content</view>
</MlTimelineItem>
<MlTimelineItem dot-color="var(--warning-color-6)">
  <template #label>
    <text>2023-09-09</text>
  </template>
  <view>
    <view>The second milestone</view>
    <view>The second milestone</view>
    <view>The second milestone</view>
  </view>
</MlTimelineItem>
<MlTimelineItem dot-color="#FF0000">
  <template #label>
    <view class="timeline-label">
      <text> 2023-09-25 </text>
      <MlIcon icon="ml-day" color="red"> </MlIcon>
    </view>
  </template>
  <view>The third milestone </view>
</MlTimelineItem>
</MlTimeline>`
    },
    {
      title: '自定义节点',
      desc: '可以通过属性 dotColor, dotType 设置节点的颜色以及节点类型。同时可通过 dot 直接传入 DOM 自定义节点样式。优先级高于 dotColor 和 dotType',
      templateCode: `<MlTimeline>
  <MlTimelineItem dot-color="skyblue" line-type="dotted">
    <template #label>
      <text>2023-09-08</text>
    </template>
    <template #dot>
      <MlIcon icon="ml-selection--circle" color="var(--primary-color-6)" />
    </template>
    <view>The first milestone content</view>
  </MlTimelineItem>
  <MlTimelineItem dot-color="var(--warning-color-6)" line-type="dashed">
    <template #label>
      <text>2023-09-09</text>
    </template>
    <template #dot>
      <MlIcon icon="ml-info--circle" color="var(--info-color-7)" />
    </template>
    <view>
      <view>The second milestone</view>
      <view>The second milestone</view>
      <view>The second milestone</view>
    </view>
  </MlTimelineItem>
  <MlTimelineItem dot-color="#FF0000">
    <template #label>
      <view class="timeline-label">
        <text> 2023-09-25 </text>
        <MlIcon icon="ml-day" color="red"> </MlIcon>
      </view>
    </template>
    <template #dot>
      <MlIcon icon="ml-close--circle" color="var(--danger-color-6)" />
    </template>
    <view>The third milestone </view>
  </MlTimelineItem>
</MlTimeline>`
    },
    {
      title: '时间轴展示类型',
      desc: '设置 mode=alternate 时将会交替展示内容。',
      templateCode: `<MlCheckboxGroup v-model:checked-list="modeCheckedList" mode="single">
  <MlCheckbox value="left">left</MlCheckbox>
  <MlCheckbox value="right">right</MlCheckbox>
  <MlCheckbox value="alternate">alternate</MlCheckbox>
</MlCheckboxGroup>

<MlTimeline :mode="modeCheckedList[0] || 'left'">
  <MlTimelineItem>
    <template #label>
      <text>2023-09-08</text>
    </template>
    <view>The first milestone content</view>
  </MlTimelineItem>
  <MlTimelineItem style="width: 100%">
    <template #label>
      <text>2023-09-09</text>
    </template>
    <view>
      <view>The second milestone</view>
      <view>The second milestone</view>
      <view>The second milestone</view>
    </view>
  </MlTimelineItem>
  <MlTimelineItem>
    <template #label>
      <text> 2023-09-25 </text>
    </template>
    <view>The third milestone </view>
  </MlTimelineItem>
</MlTimeline>`
    }
  ])

  const reverseCheckedList = ref<string[]>(['not-reverse'])
  const modeCheckedList = ref<Array<'left' | 'right' | 'alternate'>>(['left'])
</script>

<style lang="less">
  @import './index.less';
</style>
