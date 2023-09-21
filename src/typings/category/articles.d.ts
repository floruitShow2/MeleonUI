declare namespace Articles {
  export interface ArticleCard {
    id: string | number
    title: string
    author: string
    publishTime: string | number | Date
    description: string
  }
}
