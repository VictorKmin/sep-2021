export interface IPaginationResponse<T> {
  page: number,
  perPage: number,
  itemCount: number,
  data: T[]
}
