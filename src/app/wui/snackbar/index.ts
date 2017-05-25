import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule, PortalModule, MdCommonModule, LIVE_ANNOUNCER_PROVIDER } from '../core';

import { FlSnackbar } from './snackbar';
import { FlSnackbarComponent } from './snackbar.component';
import { SimpleSnackbar } from './simple-snackbar.component';


@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,
    MdCommonModule,
  ],
  exports: [FlSnackbarComponent, MdCommonModule],
  declarations: [FlSnackbarComponent, SimpleSnackbar],
  entryComponents: [FlSnackbarComponent, SimpleSnackbar],
  providers: [FlSnackbar, LIVE_ANNOUNCER_PROVIDER]
})
export class FlSnackbarModule {}

export * from './snackbar';
export * from './snackbar.component';
export * from './snackbar-config';
export * from './snackbar-ref';
export * from './simple-snackbar.component';
