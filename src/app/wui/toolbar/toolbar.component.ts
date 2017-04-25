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

  constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {
    this.theme = _themeSvc.theme;
  }

  @Input()
  set color(value: string) {
    this._updateColor(value);
  }

  private _updateColor(newColor: string) {
    this._setElementColor(newColor);
  }

  private _setElementColor(color: string) {
    if (color != null && color !== '') {
      this._themeSvc.applyBackground(this._element, this._renderer, color);
    }
  }
}
