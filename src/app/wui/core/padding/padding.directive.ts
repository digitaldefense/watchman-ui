import { Directive, ModuleWithProviders, NgModule } from '@angular/core';

@Directive({
  selector: '[wuiPadding]',
  host: {
    '[class.wui-padding]': 'true'
  }
})
export class WuiPaddingDirective { }

@NgModule({
  declarations: [WuiPaddingDirective],
  exports: [WuiPaddingDirective]
})

export class WuiPaddingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WuiPaddingModule,
      providers: []
    };
  }
}
