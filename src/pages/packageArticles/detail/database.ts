// threejs
import ThreejsMD from '../articlesDB/threejs/threejs.md?raw'
// vue
import UseVirtualHooks from '../articlesDB/vue/useVirtualHooks.md?raw'

const ArticlesDatabase: Record<string, Record<string, string>> = {
  threejs: {
    'threejs-0': ThreejsMD
  },
  vue: {
    'vue-0': UseVirtualHooks
  }
}

const findArticleById = (id: string) => {
  const database = id.split('-')[0]
  return ArticlesDatabase[database][id]
}

export { findArticleById }
