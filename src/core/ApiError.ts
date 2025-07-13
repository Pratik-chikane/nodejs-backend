import { Response } from "express";

export enum ErrorTypes {
    BAD_REQUEST = 'BadRequest',
    INTERNAL = 'Internal',
    NOT_FOUNT = 'NotFound',
    UNAUTHORIZED = 'Unauthorized',
    FORBIDDEN = 'Forbidden',
    TOKEN_EXPIRED = 'TokenExpired',
    ACCESS_TOKEN_ERROR = 'AccessTokenError',
    BAD_TOKEN = 'BadToken',
}

export class ApiError extends Error {
     type: ErrorTypes;
    statusCode: number;
    constructor(type: ErrorTypes, statusCode: number, message: string){
        super(message);
        this.type = type;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor)
    }
    static handle(err: ApiError, res: Response){
        res.status(err.statusCode || 500).json({
            type: err.type || ErrorTypes.INTERNAL,
            message: err.message || 'Internal Server Error.'
        })
    }
}