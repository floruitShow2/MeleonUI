<template>
  <List
    ref="columnRef"
    :data="list"
    :height="450"
    :item-height="50"
    :show-tip="false"
    :page-size="60"
    animation
  >
    <template #item="{ item }">
      <view
        :class="
          cs(`${prefixCls}-column-item`, {
            [`${prefixCls}-column-item--selected`]: item.selected
          })
        "
        :style="{ width: `${width}px` }"
        @click="onItemClick(item)"
      >
        {{ item.label }}
      </view>
    </template>
    <!-- 占位元素，让最底部节点可以滚动到顶部 -->
    <template #footer>
      <view :class="`${prefixCls}-column-footer`" />
    </template>
  </List>
</template>

<script setup lang="ts">
  import { ref, toRefs, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { cs } from '@meleon/uni-ui/utils'
  import type { ListInstance } from '@meleon/uni-ui/lib'
  import List from '../../ml-list/index.vue'
  import type { WithId } from '../../ml-list/index.interface'
  import type { TimeColumnEnum, TimeList } from '../index.interface'

  const props = defineProps({
    prefixCls: {
      type: String,
      required: true
    },
    list: {
      type: Array as PropType<TimeList>,
      required: true
    },
    type: {
      type: String as PropType<TimeColumnEnum>,
      default: 'hour'
    },
    value: {
      type: Number,
      default: undefined
    },
    width: {
      type: Number,
      default: 100
    }
  })
  const { prefixCls, list, value: modelValue, type } = toRefs(props)

  const emit = defineEmits(['select'])

  const columnRef = ref<ListInstance>()
  const onItemClick = (item: WithId) => {
    columnRef.value && columnRef.value.scrollIntoView(item.id)
    if (item.value) {
      emit('select', item.value)
    }
  }

  // watch(
  //   () => modelValue,
  //   (newVal) => {
  //     if (newVal) onItemClick({ id: `${type.value}${newVal}`, value: newVal })
  //   },
  //   { immediate: false }
  // )

  onMounted(() => {
    if (modelValue && modelValue.value) {
      onItemClick({ id: `${type.value}${modelValue.value}`, value: modelValue.value })
    }
  })
</script>

<style lang="less">
  @prefix: ~'.ml-time-picker';
  .ml-list-scroll {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 360px;
    }
  }
  @{prefix}-column-item {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    &--selected {
      background-color: var(--info-color-1);
    }
  }
  @{prefix}-column-footer {
    display: block;
    width: 100%;
    height: 400px;
  }
</style>
