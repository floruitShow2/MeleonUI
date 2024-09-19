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
              <!-- 用户名 -->
              <ml-form-item
                field="username"
                extra="Please enter username"
                label="Username"
                :rules="[
                  {
                    required: true,
                    message: 'Please enter username',
                    trigger: 'blur'
                  }
                ]"
              >
                <ml-input v-model:model-value="formState.username"></ml-input>
              </ml-form-item>
              <!-- 密码 -->
              <ml-form-item field="password" label="Password">
                <ml-input
                  v-model:model-value="formState.password"
                  type="password"
                ></ml-input>
              </ml-form-item>
              <!-- 部门 -->
              <ml-form-item field="section" label="Section">
                <ml-select v-model:model-value="formState.section">
                  <ml-option value="section one">Section One</ml-option>
                  <ml-option value="section two">Section Two</ml-option>
                  <ml-option value="section three">Section Three</ml-option>
                </ml-select>
              </ml-form-item>
              <!-- 选项 -->
              <ml-form-item field="options" label="Options">
                <ml-checkbox-group
                  v-model:checked-list="formState.options"
                  direction="horizontal"
                >
                  <ml-checkbox value="A">RadioA</ml-checkbox>
                  <ml-checkbox value="B">RadioB</ml-checkbox>
                  <ml-checkbox value="C">RadioC</ml-checkbox>
                  <ml-checkbox value="D">RadioD</ml-checkbox>
                  <ml-checkbox value="E">RadioE</ml-checkbox>
                </ml-checkbox-group>
              </ml-form-item>
              <!-- 时间 -->
              <ml-form-item field="date" label="Date">
                <ml-datetime-picker v-model="formState.date" mode="month" />
              </ml-form-item>
              <!-- 开关 -->
              <ml-form-item field="switch" label="Switch">
                <ml-switch v-model="formState.switch" type="circle"></ml-switch>
              </ml-form-item>
              <!-- 提交 -->
              <ml-form-item field="submit" label="Submit"> </ml-form-item>
              <!-- 重置 -->
              <ml-cell
                label="Reset"
                :type="CellTypeEnum.BUTTON"
                @btn-click="() => onClear()"
              >
              </ml-cell>
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
  import type {
    MessageInstance,
    FormInstance,
    FieldRule,
    FormEmitsPayload
  } from '@meleon/uni-ui/lib'
  import { CellTypeEnum } from '@meleon/uni-ui/lib'
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
    password: '',
    section: '',
    options: [],
    date: new Date(),
    switch: undefined
  })
  const rules = ref<Record<string, FieldRule[]>>({
    username: [
      { required: true, message: 'Please enter username【global rules】' }
    ],
    password: [
      { required: true, message: 'Please enter password' },
      {
        validator: (value, cb) => {
          if (value.length < 6) {
            cb('the length of password must be greater than 6')
          } else {
            cb()
          }
        }
      }
    ],
    section: [
      { required: true, message: 'Please enter section', trigger: 'change' }
    ],
    option: [
      { required: true, message: 'Please select options', type: 'array', trigger: 'change' }
    ],
    date: [
      { required: true, message: 'Please select date', trigger: 'change' },
      {
        validator: (value, cb) => {
          if (new Date(value).getTime() < new Date('2025-09-15').getTime()) {
            cb('the date must be greater than 2025-09-15')
          } else {
            cb()
          }
        }
      }
    ],
    switch: [
      { required: true, message: 'Please select switch', trigger: 'change' }
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
