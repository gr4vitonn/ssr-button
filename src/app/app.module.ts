import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SsrButtonDirective } from './ssr-button.directive';
import { BrowserEventsService, NoopBrowserEventsService } from './browser-events.service';
import { WindowRefService } from './window-ref.service';
import { PlatformService } from './platform.service';

@NgModule({
  declarations: [
    AppComponent,
    SsrButtonDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: BrowserEventsService,
      useFactory: _browserEventsServiceFactory,
      deps: [WindowRefService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

function _browserEventsServiceFactory(
  platformService: PlatformService,
  windowRefService: WindowRefService
): BrowserEventsService | NoopBrowserEventsService {
  return platformService.isBrowser ?
    new BrowserEventsService(windowRefService) :
    new NoopBrowserEventsService();
}
