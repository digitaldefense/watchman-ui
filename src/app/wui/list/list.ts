import {
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { FlThemeService } from '../theme2/theme.service';

/** Deprecated */
@Directive({
  selector: '[list-body]',
  host: {
    '[class.fl-list-item-body]': 'true'
  }
})
export class FlListItemBodyDirective {}

@Directive({
  selector: '[list-right]',
  host: {
    '[class.fl-list-item-secondary]': 'true'
  }
})
export class FlListItemRightDirective {}

@Directive({
  selector: 'fl-list[dense]',
  host: {
    '[class.dense]': 'true'
  }
})
export class FlListDenseDirective {}

@Component({
  selector: 'fl-li',
  templateUrl: './list-item.component.html',
  host: {
    '[class.fl-list-item]': 'true',
    'role': 'listitem'
  }
})
export class FlListItemComponent implements OnInit {
  private _isLink = false;
  private _isButton = false;

  @Input()
  set routerLink(value: string) {
    if (value != null) { this._isLink = true; }
  }

  constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) {}

  ngOnInit() {
    if (this._isLink) {
      this._renderer.setStyle(this._element.nativeElement, 'color', this._themeSvc.theme['accent']);
    }
  }
}

@Component({
  selector: 'fl-list',
  template: '<ng-content></ng-content>',
  styleUrls: ['./list.component.scss'],
  host: {
    '[class.fl-list]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class FlListComponent implements OnInit {
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
