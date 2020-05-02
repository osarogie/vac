export interface ApiResponse<T> {
  Message: string
  IsSuccessful: string
  Data: T | null
}

export const API_BASE_URL = 'http://52.168.130.46/WebAPI'

export function newApiResponse<T>(
  body: Partial<ApiResponse<T>>
): ApiResponse<T> {
  return {
    Message: '',
    IsSuccessful: '',
    Data: null,
    ...body
  }
}
