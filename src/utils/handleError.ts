import { Response } from "express"
import { ErrorType } from "@enums/ErrorType"
import { ErrorResponse } from "@interfaces/ErrorResponse";

export const handleError = (
    res: Response,
    message: string,
    status: ErrorType = ErrorType.INTERNAL_ERROR,
    errorDetails?: any
): Response => {
    const response: ErrorResponse = {
        status,
        statusText: ErrorType[status],
        message,
        errorDetails
    };
    return res.status(status).json(response);
};
