import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { WuiColorService } from './color.service';

@Directive({
  selector: '[wuiColor]',
})
export class WuiColorDirective {
  @Input()
  set wuiColor(color: string) {
    this._updateColor(color);
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2, private _color: WuiColorService) { }

  private _updateColor(newColor: string) {
    this._setElementColor(newColor);
  }

  private _setElementColor(color: string) {
    const elem = this._el.nativeElement;
    if (color != null && color !== '') {
      this._renderer.setStyle(elem, 'background-color', this._color[color]);
    }
  }

}
