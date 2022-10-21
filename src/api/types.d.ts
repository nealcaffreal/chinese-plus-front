export interface ResponseData<T> {
  status: boolean
  data: T
  message?: string
}
