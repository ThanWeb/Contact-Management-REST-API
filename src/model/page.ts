export interface Paging {
  size: number
  total_page: number
  current_page: number
}

export interface PageAble<T> {
  data: T[]
  paging: Paging
}
