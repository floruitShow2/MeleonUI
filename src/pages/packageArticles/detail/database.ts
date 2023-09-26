import ThreejsDatabase from './database/threejs'
import VueDatabase from './database/vue'
import DesignPatternDatabase from './database/designPattern'

const ArticlesDatabase: Record<string, Record<string, string>> = {
  threejs: ThreejsDatabase,
  vue: VueDatabase,
  pattern: DesignPatternDatabase
}

const findArticleById = (id: string) => {
  const database = id.split('-')[0]
  return ArticlesDatabase[database][id]
}

export { findArticleById }
