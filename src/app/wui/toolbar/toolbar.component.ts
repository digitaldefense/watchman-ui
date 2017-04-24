import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';

import { WuiThemeService } from '../theme/theme.service';
import { Theme } from '../theme/theme.tmpl';

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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class WuiToolbarComponent {
  private theme: Theme;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {
    this.theme = _themeSvc.theme;
  }

  @Input()
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
      this._renderer.setStyle(elem, 'background-color', this.theme[color]);
    }
  }
}
