import { Response } from "express"
import { ErrorType } from "@enums/ErrorType"

export const handleHttp = (res: Response,code:ErrorType = ErrorType.INTERNAL_ERROR, error: string) => {
    res.status(code).json({
        ok: false,
        message: error
    })
}

