import { ref, computed, toRefs, watchEffect } from 'vue'
import type { Key2TreeNode } from '../index.interface'
import { getCheckStateWithIntialKeys } from '../utils'

export interface CheckedStateInput {
  defaultCheckedKeys?: string[]
  checkedKeys?: string[]
  indeterminateKeys?: string[]
  key2TreeNode: Key2TreeNode
}

export default function useCheckedState(props: CheckedStateInput) {
  const {
    defaultCheckedKeys,
    checkedKeys: propCheckedKeys,
    indeterminateKeys: propIndeterminateKeys,
    key2TreeNode
  } = toRefs(props)

  const getDefaultStateWithKeys = (keys: string[]) => {
    return getCheckStateWithIntialKeys({
      initialCheckedKeys: keys,
      key2TreeNode: key2TreeNode.value
    })
  }

  const isInitialized = ref(false)
  const localCheckedKeys = ref<string[]>([])
  const localIndeterminateKeys = ref<string[]>([])

  const init = (keys: string[]) => {
    ;[localCheckedKeys.value, localIndeterminateKeys.value] = getDefaultStateWithKeys(keys)
  }
  init(propCheckedKeys?.value || defaultCheckedKeys?.value || [])

  const computedCheckedKeys = ref<string[]>([])
  const computedIndeterminateKeys = ref<string[]>([])
  watchEffect(() => {
    if (propCheckedKeys?.value) {
      ;[computedCheckedKeys.value, computedIndeterminateKeys.value] = getDefaultStateWithKeys(
        localCheckedKeys.value
      )
    } else if (isInitialized.value) {
      computedCheckedKeys.value = []
      computedIndeterminateKeys.value = []
      localCheckedKeys.value = []
      localIndeterminateKeys.value = []
    }

    if (!isInitialized.value) {
      isInitialized.value = true
    }
  })

  return {
    checkedKeys: computed(() => {
      return computedCheckedKeys.value || localCheckedKeys.value
    }),
    indeterminateKeys: computed(() => {
      return computedIndeterminateKeys.value || localIndeterminateKeys.value
    }),
    setCheckedState(
      newCheckedKeys: string[],
      newIndeterminateKeys: string[],
      reinitialize = false
    ) {
      if (reinitialize) {
        init(newCheckedKeys)
      } else {
        localCheckedKeys.value = newCheckedKeys
        localIndeterminateKeys.value = newIndeterminateKeys
      }
      return [localCheckedKeys.value, localIndeterminateKeys.value]
    }
  }
}
