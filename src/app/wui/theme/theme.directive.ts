import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

import { WuiThemeService } from './theme.service';
import { Theme } from './theme.tmpl';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit {

  @HostBinding('class.app-theme') true;

  constructor(
    private _themeSvc: WuiThemeService,
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {
    console.log('ThemeDirective');
  }

  ngOnInit() {
    const theme = this._themeSvc.theme;
    console.log('apply theme: ', theme._name);

    this._setColors(theme);
  }

  private _setColors(theme: Theme) {
    const bgColor = theme.background;
    const txtColor = theme.foreground;
    const elem = this._element.nativeElement;
    // const body = this._renderer.parentNode(elem);

    this._renderer.setStyle(elem, 'background-color', bgColor);
    this._renderer.setStyle(elem, 'color', txtColor);
  }
}
