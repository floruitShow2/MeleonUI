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
      <ml-message ref="messageRef"></ml-message>
      <!-- 基础用法 -->
      <CodeBlock>
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text></text>
        </template>
        <template #demo>
          <view class="form-container">
            <ml-form
              ref="formRef"
              :model="formState"
              :rules="rules"
              :disabled="false"
              style="width: 100%"
              @submit="onSubmit"
            >
              <ml-form-item
                field="username"
                extra="Please enter username"
                label="Username"
                :rules="[{ required: true, message: 'Please enter username' }]"
              >
                <ml-input v-model:model-value="formState.username"></ml-input>
              </ml-form-item>
              <ml-form-item field="password" label="Password">
                <ml-input
                  v-model:model-value="formState.password"
                  type="password"
                ></ml-input>
              </ml-form-item>
              <ml-form-item field="submit" label="Submit"> </ml-form-item>
            </ml-form>

            <view class="form-container-btns">
              <ml-button type="primary" @click="onClear('username')"
                >clear username</ml-button
              >
              <ml-button type="primary" @click="onClear()">clear all</ml-button>
            </view>
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
  import type { MessageInstance, FormInstance } from '@meleon/uni-ui/lib'
  import type { FieldRule, FormEmitsPayload } from '@meleon/uni-ui/lib'
  import { isUndefined } from '@meleon/uni-ui/utils'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } =
      appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const messageRef = ref<MessageInstance>()

  const formRef = ref<FormInstance>()
  const formState = ref({
    username: '',
    password: ''
  })
  const rules = ref<Record<string, FieldRule[]>>({
    username: [{ required: true, message: 'Please enter username' }],
    password: [
      { required: true, message: 'Please enter password' },
      {
        validator: (value, cb) => {
          console.log('password', value)
          if (value.length < 6) {
            cb('the length of password must be greater than 6')
          } else {
            cb()
          }
        }
      }
    ]
  })
  const onSubmit: FormEmitsPayload['submit'] = async (result) => {
    if (isUndefined(result.errors)) {
      messageRef.value?.success({
        content: `{ username: ${formState.value.username}, password: ${formState.value.password}}}`,
        duration: 2000
      })
    } else {
      console.log(result)
    }
  }

  const onClear = (field?: string) => {
    formRef.value?.clearValidate(field)
  }

  const templateMap = ref([])
</script>

<style lang="less">
  @import './index.less';
</style>
