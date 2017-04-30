import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChange, ViewEncapsulation } from '@angular/core';

import { WuiThemeService  } from '../theme';

@Component({
  selector: 'fl-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  host: {
    'role': 'img',
    '[class.fl-icon]': 'true',
    // 'aria-hidden': 'true'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlIconComponent implements AfterViewChecked, OnInit, OnChanges {
  private _color: string;
  private _previousIcon: string;
  private _previousAriaLabel: string;
  private _icon: string;

  @Input() alt: string;
  @Input('aria-label') hostAriaLabel = '';
  @Input() fontSet = 'fa';

  @Input()
  set icon(value: string) {
    if (this.fontSet === 'fa') {
      this._icon = 'fa-' + value;
    } else {
      this._icon = value;
    }
  }
  get icon(): string {
    return this._icon;
  }

  @Input()
  set color(value: string) {
    this._updateColor(value);
  }
  get color(): string {
    return this._color;
  }

  constructor(private _renderer: Renderer2, private _elRef: ElementRef, private _themeSvc: WuiThemeService) { }

  ngOnInit() {
    this._updateIconClasses();
    this._setElementColor(this.color);
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    const changedInputs = Object.keys(changes);
    this._updateIconClasses();
    this._updateAriaLabel();
  }

  ngAfterViewChecked() {
    this._updateAriaLabel();
  }

  private _updateColor(color: string) {
    this._setElementColor(color);
    this._color = color;
  }

  private _setElementColor(color: string) {
    const elem = this._elRef.nativeElement;
    if (color != null && color !== '') {
      if (color.charAt(0) === '#') {
        this._renderer.setStyle(elem, 'color', this.color);
      } else {
        this._themeSvc.applyForeground(this._elRef, this._renderer, color);
      }
    }
  }

  private _updateAriaLabel() {
    const ariaLabel = this._geteAriaLabel();
    if (ariaLabel && ariaLabel !== this._previousAriaLabel) {
      this._previousAriaLabel = ariaLabel;
      this._renderer.setAttribute(this._elRef.nativeElement, 'aria-label', ariaLabel);
    }
  }

  private _geteAriaLabel() {
    const label = this.hostAriaLabel ||
      this.alt ||
      this.icon;

    if (label) {
      return label;
    }

    const text = this._elRef.nativeElement.textContent;
    if (text) {
      return text;
    }

    return null;
  }

  private _updateIconClasses() {
    const elem = this._elRef.nativeElement;
    const fontSetClass = this.fontSet;

    this._renderer.addClass(elem, fontSetClass);

    if (this.icon !== this._previousIcon) {
      if (this._previousIcon) {
        this._renderer.removeClass(elem, this._previousIcon);
      }
      if (this.icon) {
        this._renderer.addClass(elem, this.icon);
      }
      this._previousIcon = this.icon;
    }
  }

}
