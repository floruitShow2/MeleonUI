<template>
  <view
    v-if="visible"
    id="wrapper"
    :class="className"
    :style="{ ...themeColors, ...styles.containerStyle }"
    @click.self="handleCloseDrawer"
  >
    <view id="drawer" :class="`${prefix}-wrapper`" :style="styles.drawerStyle" @click.stop>
      <view :class="`${prefix}-wrapper-header`">
        <slot name="title">标题</slot>
        <MlIcon name="ml-close" :size="22" @click="handleCloseDrawer" />
      </view>
      <view :class="`${prefix}-wrapper-content`">
        <slot />
      </view>
      <view :class="`${prefix}-wrapper-footer`">
        <slot name="footer">
          <MlButton type="primary" @click="handleDrawerOk">{{ okText }}</MlButton>
          <MlButton type="secondary" style="margin-left: 8px" @click="handleCloseDrawer">
            {{ cancelText }}
          </MlButton>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import type { PropType, CSSProperties } from 'vue'
  import { isNumber, cs, generateDeviceUI } from '@meleon/uni-ui/utils'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import MlIcon from '../ml-icon/index.vue'
  import MlButton from '../ml-button/index.vue'
  import type { DrawerProps } from './index.interface'

  const props = defineProps({
    hasNav: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    placement: {
      type: String as PropType<DrawerProps['placement']>,
      default: 'right'
    },
    width: {
      type: [String, Number],
      default: 250
    },
    height: {
      type: [String, Number],
      default: 250
    },
    radius: {
      type: [String, Number],
      default: 0
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  })
  const { placement, width, height, radius, hasNav } = toRefs(props)

  const emit = defineEmits(['update:visible', 'close', 'ok'])

  const { themeColors } = useTheme()
  const prefix = 'ml-drawer'

  const className = computed(() => {
    return cs(prefix)
  })

  const styles = computed(() => {
    const { statusBarHeight, customBarHeight, bottomBarHeight } = generateDeviceUI().ui
    const radiusValue = isNumber(radius.value) ? `${radius.value}px` : radius.value
    const radiusMap: Record<DrawerProps['placement'], string> = {
      top: `0 0 ${radiusValue} ${radiusValue}`,
      right: `${radiusValue} 0 0 ${radiusValue}`,
      bottom: `${radiusValue} ${radiusValue} 0 0`,
      left: `0 ${radiusValue} ${radiusValue} 0`
    }

    const drawerStyle: CSSProperties = {
      [placement.value]: 0
    }
    if (['left', 'right'].includes(placement.value)) {
      drawerStyle.width = isNumber(width.value) ? `${width.value}px` : width.value
    } else {
      drawerStyle.height = isNumber(height.value) ? `${height.value}px` : height.value
    }

    return {
      containerStyle: {
        top: hasNav.value ? `${statusBarHeight + customBarHeight}px` : 0
      },
      drawerStyle: {
        ...drawerStyle,
        borderRadius: radiusMap[placement.value],
        paddingBottom: ['left', 'right'].includes(placement.value) ? `${bottomBarHeight}px` : 0
      }
    }
  })

  const handleCloseDrawer = (e: MouseEvent) => {
    emit('close')
    emit('update:visible', false)
  }

  const handleDrawerOk = () => {
    emit('ok')
  }
</script>

<style lang="less">
  @import './index.less';
</style>
