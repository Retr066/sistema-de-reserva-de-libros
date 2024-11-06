import { SuccessType } from "@enums/SuccessType";
import { SuccessResponse } from "@interfaces/SuccessResponse";
import { Response } from "express"

export const handleResponse = <T>(res:Response, message: string, status: SuccessType = SuccessType.OK, data?: T): Response => {
    const response: SuccessResponse<T> = {
        status,
        statusText: SuccessType[status],
        data: data,
        message
    };
    return res.status(status).json(response);
}
