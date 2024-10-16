import { SuccessResponse } from "@interfaces/SuccessResponse";

function createSuccessResponse<T>(data: T, message: string = 'Petición exitosa' ): SuccessResponse<T> {
    return {
        status: 'success',
        data,
        message
    };
}

export default createSuccessResponse;
