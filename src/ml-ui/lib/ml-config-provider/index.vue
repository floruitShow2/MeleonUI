<template>
  <slot />
</template>

<script setup lang="ts">
  import { reactive, toRefs, provide } from 'vue'
  import type { PropType } from 'vue'
  import { configProviderInjectionKey } from './context'
  import type { ConfigProviderProps } from './index.interface'

  const props = defineProps({
    themes: {
      type: Object as PropType<ConfigProviderProps['themes']>,
      default: () => ({})
    },
    locale: {
      type: [String, Object] as PropType<
        MeleonLocale.CoreLocale | MeleonLocale.LocaleCategory
      >
    }
  })
  const { themes, locale } = toRefs(props)

  const config = reactive({ themes, locale })

  provide(configProviderInjectionKey, config)
</script>
