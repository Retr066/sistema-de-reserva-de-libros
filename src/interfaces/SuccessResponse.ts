import { SuccessType } from "@enums/SuccessType";

export interface SuccessResponse<T> {
    status: SuccessType;
    statusText: string;
    data?: T;
    message: string;
}
