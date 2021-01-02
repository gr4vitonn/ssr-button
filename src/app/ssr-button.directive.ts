import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrowserEventsService } from './browser-events.service';
import { PlatformService } from './platform.service';

@Directive({
  selector: '[appSsrButton]'
})
export class SsrButtonDirective implements AfterViewInit, OnDestroy {

  private readonly destroy$ = new Subject();

  constructor(
    private readonly platformService: PlatformService,
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly browserEventsService: BrowserEventsService
  ) { }

  ngAfterViewInit(): void {
    if (this.platformService.isServer) {
      this.disableButton();
    }

    if (this.platformService.isBrowser) {
      this.browserEventsService.onLoad$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(_ => this.enableButton());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private disableButton(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'true');
  }

  private enableButton(): void {
    this.renderer.removeAttribute(this.elementRef.nativeElement, "disabled");
  }

}
