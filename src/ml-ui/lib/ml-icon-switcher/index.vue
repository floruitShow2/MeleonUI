<template>
  <view
    :class="className"
    :hover-class="`${prefix}-hover`"
    :style="{ ...themeColors, ...style.main }"
  >
    <Icon :name="currentIcon" @click="handleStartSwitch"></Icon>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import Icon from '../ml-icon/index.vue'
  import { watch } from 'vue'

  const props = defineProps({
    prevIcon: {
      type: String,
      required: true
    },
    nextIcon: {
      type: String,
      default: ''
    },
    defaultSwitched: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: 'var(--info-color-8)'
    }
  })
  const { prevIcon, nextIcon, defaultSwitched, loading, size } = toRefs(props)

  const emit = defineEmits(['change'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-icon-switcher')
  const className = computed(() => {
    return cs(prefix.value)
  })
  const style = computed(() => {
    return {
      main: {
        '--icon-size': `${size.value}px`
      }
    }
  })

  const isSwitched = ref<boolean>()
  const currentIcon = computed(() => {
    return loading.value ? 'ml-loading' : isSwitched.value ? nextIcon.value : prevIcon.value
  })

  watch(
    () => defaultSwitched.value,
    (newVal) => {
      isSwitched.value = newVal
    },
    { immediate: true }
  )

  const handleStartSwitch = () => {
    if (loading.value || !nextIcon.value) return
    isSwitched.value = !isSwitched.value
    emit('change', isSwitched.value)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
