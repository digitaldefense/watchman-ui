import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlPaddingDirective } from './padding.directive';

@NgModule({
  declarations: [FlPaddingDirective],
  exports: [FlPaddingDirective]
})

export class FlPaddingModule {}
