import { Directive, NgModule } from '@angular/core';

@Directive({
  selector: '[flPadding]',
  host: {
    '[class.fl-padding]': 'true'
  }
})
export class FlPaddingDirective { }
