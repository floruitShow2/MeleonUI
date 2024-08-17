<template>
  <List
    ref="columnRef"
    :data="list"
    :height="400"
    :show-tip="false"
    :page-size="60"
    :style="{ width: '100%' }"
  >
    <template #item="{ item }">
      <view :class="`${prefixCls}-column-item`" @click="onItemClick(item)">
        {{ item.label }}
      </view>
    </template>
  </List>
</template>

<script setup lang="ts">
  import { ref, onMounted, toRefs } from 'vue'
  import type { PropType } from 'vue'
  import List from '../../ml-list/index.vue'
  import type { TimeList, TimeListItem } from '../index.interface'
  import type { ListInstance } from '@meleon/uni-ui/lib'
  import type { WithId } from '../../ml-list/index.interface'

  const props = defineProps({
    prefixCls: {
      type: String,
      required: true
    },
    list: {
      type: Array as PropType<TimeList>,
      required: true
    }
  })
  const { list } = toRefs(props)

  const columnRef = ref<ListInstance>()
  const onItemClick = (item: WithId) => {
    columnRef.value && columnRef.value.scrollIntoView(item.id)
  }

  onMounted(() => {
    console.log(list.value)
  })
</script>

<style lang="less">
  @prefix: ~'.ml-time-picker';
  @{prefix}-column-item {
    width: 100%;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
