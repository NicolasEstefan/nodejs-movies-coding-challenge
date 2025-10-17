export type PaginatedResult<T> = {
  data: T[]
  page: number
  totalItems: number
  totalPages: number
}
