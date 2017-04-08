import { NgModule, ModuleWithProviders } from '@angular/core';
// import {CompatibilityModule} from '../core';
import { WuiToolbarComponent, WuiToolbarRowDirective } from './toolbar.component';


@NgModule({
  // imports: [CompatibilityModule],
  exports: [WuiToolbarComponent, WuiToolbarRowDirective],
  declarations: [WuiToolbarComponent, WuiToolbarRowDirective],
})
export class WuiToolbarModule { }


export * from './toolbar.component';
