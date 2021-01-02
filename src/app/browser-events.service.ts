import { Injectable } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { WindowRefService } from './window-ref.service';

interface BrowserEvents {
  readonly onLoad$: Observable<Event>;
}

@Injectable()
export class BrowserEventsService implements BrowserEvents {

  constructor(private readonly windowRefService: WindowRefService) {}

  readonly onLoad$: Observable<Event> = fromEvent<Event>(this.windowRefService.native, "load");
}

@Injectable()
export class NoopBrowserEventsService implements BrowserEvents {

  readonly onLoad$ = of(undefined);
}