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
  selector: 'fl-toolbar-row',
  host: {
    '[class.fl-toolbar-row]': 'true',
  },
})
export class FlToolbarRowDirective {}

@Component({
  moduleId: module.id,
  selector: 'fl-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    '[class.fl-toolbar]': 'true',
    'role': 'toolbar'
  },
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FlToolbarComponent {
  private theme: Theme;
  private _shadow: number = 4;

  @Input()
  get shadow() { return this._shadow; }
  set shadow(value: number) { this._shadow = value; }

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
