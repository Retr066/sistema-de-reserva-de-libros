import { ErrorType } from "@enums/ErrorType";

export interface ErrorResponse {
    status: ErrorType;
    statusText: string;
    message: string;
    errorDetails?: any; // Información adicional sobre el error, opcional
}
