import { Component, ElementRef, Injectable, Renderer2 } from '@angular/core';

import { Theme } from './wui/theme/theme.tmpl';
import { WuiThemeService } from './wui/theme/theme.service';

/**
 * Hank (think, "Finding Dory") is an interim method to apply styles to the body
 * of the app while having minimum impact on the main AppComponent. The body
 * element is inaccessible and the app-root is incapable of using directives so,
 * for now, this is the best solution
 */
@Injectable()
export class Hank {
  constructor(
    private _themeSvc: WuiThemeService,
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {
    this._setColors(_themeSvc.theme);
  }

  private _setColors(theme: Theme) {
    const bgColor = theme.background;
    const txtColor = theme.foreground;
    const elem = this._element.nativeElement;
    const body = this._renderer.parentNode(elem);
    // const themeBase = theme.base

    this._renderer.setStyle(body, 'background-color', bgColor);
    this._renderer.setStyle(body, 'color', txtColor);
    this._renderer.addClass(body, 'fl-theme-dark');
  }
}

@Component({
  selector: 'wui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Hank]
})
export class AppComponent {

  constructor(private _hank: Hank) { }

}
