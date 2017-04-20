import { Component, Directive, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: 'wui-card-title',
  host: {
    '[class.wui-card-title]': 'true'
  }
})
export class WuiCardTitle {}

@Directive({
  selector: 'wui-card-subtitle',
  host: {
    '[class.wui-card-subtitle]': 'true'
  }
})
export class WuiCardSubtitle {}

@Directive({
  selector: 'wui-card-controls',
  host: {
    '[class.wui-card-controls]': 'true'
  }
})
export class WuiCardControls {}

@Directive({
  selector: 'wui-card-body',
  host: {
    '[class.wui-card-body]': 'true'
  }
})
export class WuiCardBody {}

@Directive({
  selector: 'wui-card-footer',
  host: {
    '[class.wui-card-footer]': 'true'
  }
})
export class WuiCardFooter {}

@Directive({
  selector: 'wui-card-actions',
  host: {
    '[class.wui-card-actions]': 'true'
  }
})
export class WuiCardActions {}

@Component({
  selector: 'section[wui-card]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.scss'],
  host: {
    '[class.wui-card]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class WuiCardComponent {}

@Component({
  selector: 'wui-card-header',
  templateUrl: './card-header.component.html',
  host: {
    '[class.wui-card-header]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class WuiCardHeaderComponent {}

@Component({
  selector: 'wui-card-title-group',
  templateUrl: './card-title-group.component.html',
  host: {
    '[class.wui-card-title-group]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class WuiCardTitleGroupComponent {}
