import lodash from 'lodash';
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch (exception: HttpException, host: ArgumentsHost) {
        const request = host.switchToHttp().getRequest();
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        return response.status(status).json({

        });
    }
}
