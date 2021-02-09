import { HttpException, HttpStatus } from '@nestjs/common';
import * as TEXT from '../constants'
import { ERROR_CODE } from '../../common/constants/index'

interface IError {
    message: string,
    code: ERROR_CODE
}
export class UnprocessableError extends HttpException {
    constructor(options: IError) {
        super(
            options,
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}

export class ValidationError extends HttpException {
    constructor(options?: string) {
        super(
            {
                message: options || TEXT.VALIDATION_ERROR_DEFAULT,
                code: TEXT.ERROR_CODE.FIELD_VALIDATE_ERROR,
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}

export class UnauthorizedError extends HttpException {
    constructor(options?: string) {
        super(
            {
                message: options || TEXT.HTTP_UNAUTHORIZED_TEXT_DEFAULT,
                code: TEXT.ERROR_CODE.UNAUTHORIZED,
            },
            HttpStatus.FORBIDDEN,
        );
    }
}

export class UnauthenticatedError extends HttpException {
    constructor(options?: string) {
        super(
            {
                message: options || TEXT.HTTP_UNAUTHENTICATED_TEXT_DEFAULT,
                code: TEXT.ERROR_CODE.UNAUTHENTICATED,
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
