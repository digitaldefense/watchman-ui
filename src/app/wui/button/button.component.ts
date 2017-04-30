import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { coerceBooleanProperty, /*FocusOriginMonitor*/ } from '../core';
import { WuiThemeService } from '../theme/theme.service';
import { Theme } from '../theme/theme.tmpl';

@Directive({
  selector: 'button[wui-button], a[wui-button]',
  host: { '[class.wui-button]': 'true' }
})
export class WuiButtonStyler {}

@Directive({
  selector: 'button[wui-raised-button], a[wui-raised-button]',
  host: { '[class.wui-raised-button]': 'true' }
})
export class WuiRaisedButtonStyler {}

@Component({
  moduleId: module.id,
  selector: 'button[wui-button], button[wui-raised-button], button[fl-icon-button]',
  host: { '[disabled]': 'disabled' },
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WuiButton {
  private _color: string;
  private _disabled: boolean = null;

  protected theme;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value) ? true : null; }

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: WuiThemeService
  ) {
    this.theme = _themeSvc.theme;
  }

  /** The color of the button. Can be `primary`, `accent`, or `warn`. */
  @Input()
  get color(): string { return this._color; }
  set color(value: string) { this._updateColor(value); }

  _updateColor(newColor: string) {
    this._setElementColor(this._color, false);
    this._setElementColor(newColor, true);
    this._color = newColor;
  }

  _setElementColor(color: string, isAdd: boolean) {
    const elem = this._element.nativeElement;
    if (color != null && color != '') {
      this._renderer.setStyle(elem, 'background-color', this.theme[color]);
      this._renderer.setStyle(elem, 'border-color', this.theme[color]);
    }
  }
}
