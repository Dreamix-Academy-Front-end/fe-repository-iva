import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { finalize, switchMap, timer } from 'rxjs';

const displayDuration = 800;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = new LoadingService();
  loadingService.show();

  const timer$ = timer(displayDuration);

  return next(req).pipe(
    switchMap((event) => timer$.pipe(switchMap(() => [event]))),
    finalize(() => {
      loadingService.hide();
    })
  );
};