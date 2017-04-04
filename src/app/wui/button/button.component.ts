import { Component, Directive, ElementRef, HostBinding, Input, OnDestroy, Renderer, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: 'button[wui-button], a[wui-button]',
  host: { '[class.wui-button]': 'true' }
})
export class WuiButtonStyler {}

@Component({
  moduleId: module.id,
  selector: 'button[wui-button], button[wui-raised-button], button[wui-icon-button]',
  host: { '[disabled]': 'disabled' },
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WuiButton implements OnDestroy {
  private _color: string;
  private _disabled: boolean = null;

  // @Input()
  // get disabled() { return this._disabled; }
  // set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value) ? true : null; }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  ngOnDestroy() {

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
    if (color != null && color != '') {
      this._renderer.setElementClass(this._getHostElement(), `${color}`, isAdd);
    }
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }
}
