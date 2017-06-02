import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChange,
  ViewEncapsulation,
  ɵisListLikeIterable as isListLikeIterable
} from '@angular/core';

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

  @Input() alt: string;
  @Input('aria-label') hostAriaLabel = '';

  @HostBinding('class.fa') true;

  constructor(
    private _renderer: Renderer2,
    private _element: ElementRef,
    private _themeSvc: FlThemeService
  ) { }

  @Input()
  set color(value: string) {
    this._updateColor(value);
  }
  get color(): string {
    return this._color;
  }

  @Input() ngClass: string[] | Set<string> | {[icn: string]: any};

  ngOnInit() {
    this._theme = this._themeSvc.theme;
    this._setElementColor(this.color);
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    this._updateAriaLabel();
  }

  ngAfterViewChecked() {
    this._updateAriaLabel();
  }

  /** Mostly used by other components to restore icon colors to default */
  resetColor() {
    this._renderer.removeStyle(this._element.nativeElement, 'color');
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
      this.ngClass;

    if (label) {
      return label;
    }

    const text = this._element.nativeElement.textContent;
    if (text) {
      return text;
    }

    return null;
  }
}
