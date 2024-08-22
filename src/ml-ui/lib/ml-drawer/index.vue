<template>
  <view
    v-if="visible"
    id="wrapper"
    :class="className"
    :style="{ ...themeColors, ...styles.containerStyle }"
    @click.self="handleCloseDrawer"
  >
    <view
      id="drawer"
      :class="`${prefix}-wrapper`"
      :animation="animationData"
      :style="styles.drawerStyle"
      @click.stop
    >
      <view :class="`${prefix}-wrapper-header`">
        <slot name="title">标题</slot>
        <MlIcon
          v-if="showClose"
          name="ml-close"
          :size="22"
          @click="handleCloseDrawer"
        />
      </view>
      <view :class="`${prefix}-wrapper-content`">
        <slot />
      </view>
      <view v-if="showFooter" :class="`${prefix}-wrapper-footer`">
        <slot name="footer">
          <MlButton type="primary" @click="handleDrawerOk">{{
            okText
          }}</MlButton>
          <MlButton
            type="secondary"
            style="margin-left: 8px"
            @click="handleCloseDrawer"
          >
            {{ cancelText }}
          </MlButton>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch } from 'vue'
  import type { PropType, CSSProperties } from 'vue'
  import { isNumber, cs, generateDeviceUI } from '@meleon/uni-ui/utils'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import type { DrawerProps } from './index.interface'
  import MlIcon from '../ml-icon/index.vue'
  import MlButton from '../ml-button/index.vue'

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
      type: Number,
      default: 250
    },
    height: {
      type: Number,
      default: 250
    },
    radius: {
      type: [String, Number],
      default: 0
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
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
  const { visible, placement, width, height, radius, hasNav } = toRefs(props)

  const emit = defineEmits(['update:visible', 'close', 'ok'])

  const { themeColors } = useTheme()
  const prefix = ref('ml-drawer')

  const className = computed(() => {
    return cs(prefix.value)
  })

  const styles = computed(() => {
    const { statusBarHeight, customBarHeight, bottomBarHeight } =
      generateDeviceUI().ui

    const radiusValue = isNumber(radius.value)
      ? `${radius.value}px`
      : radius.value
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
      drawerStyle.transform = `translateX(${
        placement.value === 'left' ? `-${width.value}px` : `${width.value}px`
      })`
      drawerStyle.width = isNumber(width.value)
        ? `${width.value}px`
        : width.value
    } else {
      drawerStyle.transform = `translateY(${
        placement.value === 'top' ? `-${height.value}px` : `${height.value}px`
      })`
      drawerStyle.height = isNumber(height.value)
        ? `${height.value}px`
        : height.value
    }

    return {
      containerStyle: {
        top: hasNav.value ? `${statusBarHeight + customBarHeight}px` : 0
      },
      drawerStyle: {
        ...drawerStyle,
        borderRadius: radiusMap[placement.value],
        paddingBottom: ['left', 'right'].includes(placement.value)
          ? `${bottomBarHeight}px`
          : 0
      }
    }
  })

  const handleCloseDrawer = (e: MouseEvent) => {
    if (animation.value) {
      switch (placement.value) {
        case 'left':
          animation.value.translateX(-width.value).step()
          break
        case 'right':
          animation.value.translateX(width.value).step()
          break
        case 'top':
          animation.value.translateY(-height.value).step()
          break
        case 'bottom':
          animation.value.translateY(height.value).step()
          break
      }
      animationData.value = animation.value.export()
      setTimeout(() => {
        emit('close')
        emit('update:visible', false)
        animationData.value = {}
      }, 300)
    } else {
      emit('close')
      emit('update:visible', false)
    }
  }

  const handleDrawerOk = () => {
    emit('ok')
  }

  const animation = ref<UniApp.Animation>()
  const animationData = ref<any>({})

  const handleOpenAnimation = () => {
    if (!animation.value) return
    if (['left', 'right'].includes(placement.value)) {
      animation.value.translateX(0).step()
    } else {
      animation.value.translateY(0).step()
    }
    animationData.value = animation.value.export()
  }

  watch(
    visible,
    (newVal) => {
      if (newVal) {
        setTimeout(() => {
          handleOpenAnimation()
        }, 300)
      }
    },
    { immediate: false }
  )

  const transformOriginMap: Record<DrawerProps['placement'], string> = {
    right: 'right center',
    left: 'left center',
    top: 'center top',
    bottom: 'center bottom'
  }
  const initAnimation = () => {
    animation.value = uni.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      transformOrigin: transformOriginMap[placement.value]
    })
  }
  watch(
    placement,
    () => {
      initAnimation()
    },
    { immediate: true }
  )
</script>

<style lang="less">
  @import './index.less';
</style>
