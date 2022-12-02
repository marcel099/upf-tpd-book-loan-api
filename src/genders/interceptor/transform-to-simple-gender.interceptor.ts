import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenderEntity } from '../entities/gender.entity';

type Interf = GenderEntity;

@Injectable()
export class TransformToSimpleGenderInterceptor<T>
  implements NestInterceptor<T, Interf>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        id: data.id,
        name: data.name,
      })),
    );
  }
}
