/**
 * https://zhuanlan.zhihu.com/p/586355635
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    return next.handle().pipe(
      map((data) =>
        Object({
          code: HttpStatus.OK,
          data,
        }),
      ),
    );
  }
}
