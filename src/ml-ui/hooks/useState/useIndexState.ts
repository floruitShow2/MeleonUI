import { ref } from 'vue'

export default function useIndexState() {
  const total = ref(0)

  function getIndexState() {
    total.value += 1
    return total.value
  }

  return {
    total,
    getIndexState
  }
}
