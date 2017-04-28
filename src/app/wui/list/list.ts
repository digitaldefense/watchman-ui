import {
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { WuiThemeService } from '../theme';

/** Deprecated */
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

@Directive({
  selector: 'wui-list[dense]',
  host: {
    '[class.dense]': 'true'
  }
})
export class WuiListDenseDirective {}

@Component({
  selector: 'wui-li',
  templateUrl: './list-item.component.html',
  host: {
    '[class.wui-list-item]': 'true',
    'role': 'listitem'
  }
})
export class WuiListItemComponent implements OnInit {
  private _isLink = false;
  private _isButton = false;

  @Input()
  set routerLink(value: string) {
    if (value != null) { this._isLink = true; }
  }

  constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {}

  ngOnInit() {
    if (this._isLink) {
      this._themeSvc.applyForeground(this._element, this._renderer, 'link');
    }
  }
}

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
