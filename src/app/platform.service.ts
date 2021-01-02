import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly isServer = isPlatformServer(this.platformId);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) { }
 
}
