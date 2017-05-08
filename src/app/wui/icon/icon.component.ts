import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChange, ViewEncapsulation } from '@angular/core';

import { FlThemeService } from '../theme2/theme.service';

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
  private _theme: any;
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

  constructor(private _renderer: Renderer2, private _element: ElementRef, private _themeSvc: FlThemeService) { }

  ngOnInit() {
    this._theme = this._themeSvc.theme;
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
    if (color != null && color !== '') {
      this._themeSvc.applyColor(this._element, this._renderer, color);
    } else {
      this._renderer.setStyle(this._element.nativeElement, 'color', this._theme['icon']);
    }
  }

  private _updateAriaLabel() {
    const ariaLabel = this._geteAriaLabel();
    if (ariaLabel && ariaLabel !== this._previousAriaLabel) {
      this._previousAriaLabel = ariaLabel;
      this._renderer.setAttribute(this._element.nativeElement, 'aria-label', ariaLabel);
    }
  }

  private _geteAriaLabel() {
    const label = this.hostAriaLabel ||
      this.alt ||
      this.icon;

    if (label) {
      return label;
    }

    const text = this._element.nativeElement.textContent;
    if (text) {
      return text;
    }

    return null;
  }

  private _updateIconClasses() {
    const elem = this._element.nativeElement;
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
