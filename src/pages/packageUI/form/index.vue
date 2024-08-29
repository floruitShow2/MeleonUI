<template>
  <view class="form-view">
    <ml-navigator
      title="ml-form"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="form-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock>
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text></text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-form :model="formState" style="width: 100%">
              <ml-form-item
                field="username"
                extra="Please enter username"
                label="Username"
                :rules="[{ required: true }]"
              >
                <ml-input v-model:model-value="formState.username"></ml-input>
              </ml-form-item>
              <ml-form-item field="password" label="Password">
                <ml-input
                  v-model:model-value="formState.password"
                  type="password"
                ></ml-input>
              </ml-form-item>
            </ml-form>
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
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } =
      appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const formState = ref({
    username: '',
    password: ''
  })

  const templateMap = ref([])
</script>

<style lang="less">
  @import './index.less';
</style>
