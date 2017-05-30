import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { Focusable } from '../core/a11y/focus-key-manager';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';

@Component({
  selector: 'button[fl-menu-item]',
  templateUrl: 'menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  host: {
    'role': 'menuitem',
    '[class.fl-menu-item]': 'true',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.disabled]': '_getDisabledAttr()',
    '(click)': '_checkDisabled($event)'
  },
  encapsulation: ViewEncapsulation.None,
  exportAs: 'flMenuItem'
})
export class FlMenuItemComponent implements Focusable {
  private _disabled = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  constructor(private _element: ElementRef) { }

  focus(): void {
    this._getHostElement().focus();
  }

  _getTabIndex(): string {
    return this._disabled ? '-1' : '0';
  }

  _getDisabledAttr(): boolean {
    return this._disabled ? true : null;
  }

  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  _checkDisabled(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
