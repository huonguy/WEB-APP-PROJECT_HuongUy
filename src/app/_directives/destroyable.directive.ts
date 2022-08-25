import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appDestroyable]'
})
export abstract class DestroyableDirective implements OnDestroy {
  destroy$ = new Subject();
  constructor() { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
