import { ModuleWithProviders, NgModule } from '@angular/core';
import { WuiPaddingDirective } from './padding.directive';

export { WuiPaddingDirective } from './padding.directive';

@NgModule({
    exports: [WuiPaddingDirective],
    declarations: [WuiPaddingDirective],
    providers: []
})

export class WuiPaddingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WuiPaddingModule,
      providers: []
    };
  }
}
