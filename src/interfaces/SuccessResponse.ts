export interface SuccessResponse<T> {
    status: string;
    data: T;
    message: string;
}
