import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[wuiColor]',
})
export class WuiColorDirective {
  private _color: string;

  @Input()
  get wuiColor(): string {
    return this._color;
  }
  set wuiColor(color: string) {
    this._updateColor(color);
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2) { }

  // ngOnInit() {
  //   this._renderer.addClass(this._el.nativeElement, this.wuiColor);
  // }

  private _updateColor(newColor: string) {
    // this._setElementColor(this._color, false);
    this._setElementColor(newColor);
    this._color = newColor;
  }

  private _setElementColor(color: string) {
    if (color != null && color !== '') {
      this._renderer.addClass(this._el.nativeElement, `wui-${color}`);
    }
    else {
      this._renderer.addClass(this._el.nativeElement, `wui-default`);
    }
  }

}
