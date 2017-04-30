import { NgModule, ModuleWithProviders } from '@angular/core';
// import {CompatibilityModule} from '../core';
import { FlToolbarComponent, FlToolbarRowDirective } from './toolbar.component';


@NgModule({
  // imports: [CompatibilityModule],
  exports: [FlToolbarComponent, FlToolbarRowDirective],
  declarations: [FlToolbarComponent, FlToolbarRowDirective],
})
export class FlToolbarModule { }


export * from './toolbar.component';
