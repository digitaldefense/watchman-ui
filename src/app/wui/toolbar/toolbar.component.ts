import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';

import { WuiColorService } from '../core/color/color.service';

@Directive({
  selector: 'wui-toolbar-row',
  host: {
    '[class.wui-toolbar-row]': 'true',
  },
})
export class WuiToolbarRowDirective {}

@Component({
  moduleId: module.id,
  selector: 'wui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    '[class.wui-toolbar]': 'true',
    'role': 'toolbar'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class WuiToolbarComponent {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private _color: WuiColorService) {}

  /** The color of the toolbar. Can be primary, accent, or warn. */
  @Input()
  // get color(): string {
  //   return this._color;
  // }
  set color(value: string) {
    this._updateColor(value);
  }

  private _updateColor(newColor: string) {
    // this._setElementColor(this._color, false);
    this._setElementColor(newColor);
    // this._color = newColor;
  }

  private _setElementColor(color: string) {
    const elem = this._elementRef.nativeElement;
    if (color != null && color !== '') {
    //   this._renderer.addClass(this._elementRef.nativeElement, `wui-${color}-bg`);
    // } else {
    //   this._renderer.addClass(this._elementRef.nativeElement, `wui-default-bg`);
      this._renderer.setStyle(elem, 'background-color', this._color[color]);
    }
  }
}
