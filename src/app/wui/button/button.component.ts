import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { coerceBooleanProperty, /*FocusOriginMonitor*/ } from '../core';
import { FlThemeService } from '../theme2/theme.service';
import { Theme } from '../theme/theme.tmpl';

@Directive({
  selector: 'button[fl-button], a[fl-button]',
  host: { '[class.fl-button]': 'true' }
})
export class FlFlatButtonStyle {}

@Directive({
  selector: 'button[fl-raised-button], a[fl-raised-button]',
  host: { '[class.fl-raised-button]': 'true' }
})
export class FlRaisedButtonStyle {}

@Directive({
  selector: 'button[fl-icon-button], a[fl-icon-button]',
  host: { '[class.fl-icon-button]': 'true' }
})
export class FlIconButtonStyle {}

@Component({
  selector: 'button[fl-button], button[fl-raised-button], button[fl-icon-button], a[fl-button], a[fl-raised-button], a[fl-icon-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['button.component.scss'],
  // host: { '[disabled]': 'disabled' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlButtonComponent implements OnInit {
  private _color: string;
  private _disabled: boolean = null;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value) ? true : null; }

  @Input()
  get color() { return this._color; }
  set color(value: string) { this._color = value; }

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: FlThemeService
  ) {}

  ngOnInit() {
    if (this._disabled) { return; }

    if (this.color == null) { this.color = 'primary'; }
    const elem = this._element.nativeElement;
    const attrs = elem.attributes;
    if (attrs.hasOwnProperty('fl-button') || attrs.hasOwnProperty('fl-icon-button')) {
      this._themeSvc.applyColor(this._element, this._renderer, this.color);
    } else {
      this._themeSvc.applyBgColor(this._element, this._renderer, this.color);
    }
  }
}
