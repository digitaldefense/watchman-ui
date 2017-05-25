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
import { PALETTE } from '../theme2/palette';


function rgbToHex(value: string) {
  const SPACE = /\s/g;
  const rgbStr: string = value.slice(4, value.length - 1).replace(SPACE, '');
  const rgb: string[] = rgbStr.split(',');
  return '#' + numberToHex(Number(rgb[0])) + numberToHex(Number(rgb[1])) + numberToHex(Number(rgb[2]));
}

function numberToHex(c: number): string {
  const hex = c.toString(16);
  return (hex.length === 1) ? '0' + hex : hex;
}

@Directive({
  selector: 'button[fl-button], a[fl-button]',
  host: { '[class.fl-button]': 'true' }
})
export class FlFlatButtonStyle {}

@Directive({
  selector: 'button[fl-raised-button], a[fl-raised-button]',
  host: { '[class.fl-raised-button]': 'true' }
})
export class FlRaisedButtonStyle implements OnInit {
  private _offColor: string = 'default';
  private _onColor: string;
  private _theme;

  @Input('color')
  set offColor(value: string) {
    this._offColor = value;
  }

  constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) {}

  @HostListener('mouseenter') onMouseEnter() {
    const elem = this._element.nativeElement;
    this._renderer.setStyle(elem, 'background-color', this._onColor);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this._themeSvc.applyBgColor(this._element, this._renderer, this._offColor);
  }

  ngOnInit() {
    this._theme = this._themeSvc.theme;
    this._themeSvc.applyBgColor(this._element, this._renderer, this._offColor);
    this._setOnColor();
  }

  private _setOnColor() {
    switch (this._offColor) {
      case 'success':
        this._onColor = PALETTE.green['800'];
        break;
      case 'warning':
        this._onColor = PALETTE.amber['800'];
        break;
      case 'danger':
        this._onColor = PALETTE.red['800'];
        break;
      case 'primary':
        this._onColor = this._theme['primaryDark'];
        break;
      case 'accent':
        this._onColor = this._theme['accentDark'];
        break;
      default:
        this._onColor = (this._theme.base === 'light') ? PALETTE.gray['100'] : PALETTE.gray['700'];
    }
  }
}

@Directive({
  selector: 'button[fl-icon-button], a[fl-icon-button]',
  host: { '[class.fl-icon-button]': 'true' }
})
export class FlIconButtonStyle {
  constructor(private _element: ElementRef, private _renderer: Renderer2) {}
  @HostListener('mouseover') onMouseOver() {
    this._renderer.setStyle(this._element.nativeElement, 'opacity', '0.7');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this._renderer.setStyle(this._element.nativeElement, 'opacity', '1');
  }
}

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
  private _isTextBtn: boolean;

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
    const elem = this._element.nativeElement;
    const attrs = elem.attributes;

    if (this._disabled || this._color == null) { return; }

    if (attrs.hasOwnProperty('fl-button') || attrs.hasOwnProperty('fl-icon-button')) {
      this._themeSvc.applyColor(this._element, this._renderer, this.color);
    // } else {
    //   this._themeSvc.applyBgColor(this._element, this._renderer, this.color);
    }
  }
}
