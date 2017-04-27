import {
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

@Directive({
  selector: '[list-body]',
  host: {
    '[class.wui-list-item-body]': 'true'
  }
})
export class WuiListItemBodyDirective {}

@Directive({
  selector: '[list-right]',
  host: {
    '[class.wui-list-item-secondary]': 'true'
  }
})
export class WuiListItemRightDirective {}

@Component({
  selector: 'wui-list-item',
  templateUrl: './list-item.component.html',
  host: {
    '[class.wui-list-item]': 'true',
    'role': 'listitem',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
  }
})
export class WuiListItemComponent {}

@Component({
  selector: 'wui-list',
  template: '<ng-content></ng-content>',
  styleUrls: ['./list.component.scss'],
  host: {
    '[class.wui-list]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class WuiListComponent implements OnInit {
  hasFocus = false;

  constructor() { }

  ngOnInit() {
  }

  protected _onFocus() {
    this.hasFocus = true;
  }

  protected _onBlur() {
    this.hasFocus = false;
  }
}
