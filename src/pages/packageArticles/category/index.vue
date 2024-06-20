<template>
  <view :class="prefix">
    <MlNavigator
      title="全部分类"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view :class="`${prefix}-wrapper`" :style="wrapperStyle">
      <!-- 激活的频道 -->
      <view :class="`${prefix}-wrapper-category active`">
        <view class="title-container">
          <text class="title">我的频道【{{ allowDrag ? '长按可拖拽' : '点击进入' }}】</text>
          <MlButton type="text" size="mini" status="normal" @click="handleStartEdit">
            {{ allowDrag ? '取消编辑' : '编辑' }}
          </MlButton>
        </view>
        <view class="category-container">
          <BasicDrag
            v-model:value="activeCategories"
            item-key="value"
            :column="4"
            item-height="40px"
            :disable-drag="!allowDrag"
          >
            <template #item="{ element, width }">
              <MlButton
                type="secondary"
                size="small"
                :disabled="allowDrag"
                :style="{ width: `${width}px` }"
              >
                {{ element.label }}
                <MlIcon
                  v-show="allowDrag"
                  icon="ml-close"
                  :size="16"
                  @click.stop="handleItemClose(element)"
                />
              </MlButton>
            </template>
          </BasicDrag>
        </view>
      </view>
      <!-- 未激活的频道 -->
      <view :class="`${prefix}-wrapper-category inactive`">
        <view class="title-container">
          <text class="title">
            更多话题【{{ inactiveCategories.length ? '点击添加' : '暂无更多频道' }}】
          </text>
        </view>
        <view class="category-container">
          <MlButton
            v-for="item in inactiveCategories"
            :key="item.value"
            type="secondary"
            size="small"
            :disabled="!allowDrag"
            :style="{ width: buttonWidth }"
            @click.stop="handleItemAdd(item)"
          >
            {{ item.label }}
            <MlIcon v-show="allowDrag" icon="ml-plus" :size="16"></MlIcon>
          </MlButton>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlButton from '@/ml-ui/lib/ml-button/index.vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
  import BasicDrag from '@/components/basic-drag/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })
  const prefix = 'acticle-category'

  const categories = ref<Record<string, string>[]>([
    {
      label: 'Vue',
      value: 'vue'
    },
    {
      label: 'Threejs',
      value: 'threejs'
    },
    {
      label: '设计模式',
      value: 'designPattern'
    },
    {
      label: 'Echarts',
      value: 'echarts'
    },
    {
      label: 'React',
      value: 'react'
    },
    {
      label: 'UniApp',
      value: 'uniapp'
    }
  ])
  const activeCategories = ref<Record<string, string>[]>([
    {
      label: 'Vue',
      value: 'vue'
    },
    {
      label: 'Threejs',
      value: 'threejs'
    },
    {
      label: '设计模式',
      value: 'designPattern'
    },
    {
      label: 'Echarts',
      value: 'echarts'
    },
    {
      label: 'React',
      value: 'react'
    }
  ])
  const activeValues = computed(() => {
    return activeCategories.value.map((item) => item.value)
  })
  const inactiveCategories = ref<Record<string, string>[]>([])
  const init = () => {
    // 从服务器获取所有标签
    inactiveCategories.value = categories.value.filter(
      (item) => !activeValues.value.includes(item.value)
    )
  }
  onMounted(init)

  const buttonWidth = computed(() => {
    const { screenWidth } = appStore.appSize
    return `${screenWidth / 4 - 10}px`
  })
  const allowDrag = ref<boolean>(false)
  const handleStartEdit = () => {
    allowDrag.value = !allowDrag.value
  }
  const handleItemClose = (element: Record<string, string>) => {
    if (!allowDrag.value) return
    const findIdx = activeCategories.value.findIndex((item) => item.value === element.value)
    if (findIdx === -1) return
    activeCategories.value.splice(findIdx, 1)
    const { value, label } = element
    inactiveCategories.value.push({ value, label })
  }
  const handleItemAdd = (element: Record<string, string>) => {
    activeCategories.value.push(element)
    const findIdx = inactiveCategories.value.findIndex((item) => item.value === element.value)
    if (findIdx === -1) return
    inactiveCategories.value.splice(findIdx, 1)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
