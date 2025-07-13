import { ApiError, ErrorTypes } from "./ApiError";

export class BadRequestError extends ApiError{
    constructor(message: string = 'Bad Request'){
        super(ErrorTypes.BAD_REQUEST, 400, message);
    }
}

export class NotFoundError extends ApiError{
    constructor(message: string = 'Not Found'){
        super(ErrorTypes.NOT_FOUNT, 404, message);
    }
}

export class UnauthorizedError extends ApiError{
    constructor(message: string = 'Unauthorized'){
        super(ErrorTypes.UNAUTHORIZED, 401, message);
    }
}

export class ForbiddenError extends ApiError{
    constructor(message: string = 'Forbidden'){
        super(ErrorTypes.FORBIDDEN, 403, message);
    }
}

export class InternalError extends ApiError{
    constructor(message: string = 'Internal Server Error'){
        super(ErrorTypes.INTERNAL, 500, message);
    }
}

export class TokenExpiredError extends ApiError{
    constructor(message: string = 'Token Expired'){
        super(ErrorTypes.TOKEN_EXPIRED, 401, message);
    }
}

export class AccessTokenError extends ApiError{
    constructor(message: string = 'Access Token Error'){
        super(ErrorTypes.ACCESS_TOKEN_ERROR, 401, message);
    }
}

export class BadTokenError extends ApiError{
    constructor(message: string = 'Bad Token'){
        super(ErrorTypes.BAD_TOKEN, 400, message);
    }
}