export interface PagingRequest {
    page: number
    size: number
}

export interface PagingResponse<T> {
    total: number
    rows: T
}