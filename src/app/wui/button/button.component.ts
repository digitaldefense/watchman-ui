import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { coerceBooleanProperty, /*FocusOriginMonitor*/ } from '../core';
import { FlThemeService } from '../theme2/theme.service';
// import { PALETTE } from '../theme2/palette';
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
export class FlButtonComponent implements OnInit, AfterViewInit {
  private _color: string;
  private _disabled: boolean = null;
  private _isTextBtn: boolean;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value) ? true : null; }

  @Input()
  get color() { return this._color; }
  set color(value: string) { this._color = value; }

  @HostListener('mouseenter') onMouseEnter() {
    if (this._isTextBtn) {
      this._themeSvc.applyColor(this._element, this._renderer, 'hover');
    } else {
      this._themeSvc.applyBgColor(this._element, this._renderer, 'hover');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this._isTextBtn) {
      this._themeSvc.applyColor(this._element, this._renderer, this.color);
    } else {
      this._themeSvc.applyBgColor(this._element, this._renderer, this.color);
    }
  }

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _themeSvc: FlThemeService
  ) {}

  ngOnInit() {
    const elem = this._element.nativeElement;
    const attrs = elem.attributes;

    if (this._disabled || this._color == null) { return; }

    if (attrs.hasOwnProperty('fl-button') || attrs.hasOwnProperty('fl-icon-button')) {
      this._themeSvc.applyColor(this._element, this._renderer, this.color);
    } else {
      this._themeSvc.applyBgColor(this._element, this._renderer, this.color);
    }
  }

  ngAfterViewInit() {
    const elem = this._element.nativeElement;

    // get the original color for buttons with no color attribute
    if (this._color == null) {
      const styles = window.getComputedStyle(elem, null);
      const bgColor = styles.backgroundColor;
      this.color = this._rgbToHex(bgColor);
      console.log(this.color);
    }
  }

  private _rgbToHex(value: string) {
    const SPACE = /\s/g;
    const rgbStr: string = value.slice(4, value.length - 1).replace(SPACE, '');
    const rgb: string[] = rgbStr.split(',');
    return '#' + this._numberToHex(Number(rgb[0])) + this._numberToHex(Number(rgb[1])) + this._numberToHex(Number(rgb[2]));
  }

  private _numberToHex(c: number): string {
    const hex = c.toString(16);
    return (hex.length === 1) ? '0' + hex : hex;
  }
}
