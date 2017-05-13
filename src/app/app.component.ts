import { Component, ElementRef, Injectable, OnInit, Renderer2 } from '@angular/core';

import { Theme } from './wui/theme/theme.tmpl';
import { WuiThemeService } from './wui/theme/theme.service';
import { FlThemeService } from './wui/theme2/theme.service';

// import { themeServiceProvider } from './wui/theme2/theme.service.provider';

const myTheme = {
  name: 'myTheme',
  base: 'light',
  primary: '#fff000',
  accent: '#ff7723'
};

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
    private _renderer: Renderer2,
    // private _theme2: FlThemeService
  ) {
    // console.log('Hank sets the theme...');
    
    // this._setColors(_themeSvc.theme);
    // this._theme2.set('dark');
  }

  private _setColors(theme: Theme) {
    const bgColor = theme.background;
    const txtColor = theme.foreground;
    const elem = this._element.nativeElement;
    const body = this._renderer.parentNode(elem);

    this._renderer.setStyle(body, 'background-color', bgColor);
    this._renderer.setStyle(body, 'color', txtColor);
    this._renderer.addClass(body, 'fl-theme-dark');
  }
}

@Component({
  selector: 'wui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Hank, FlThemeService]
})
export class AppComponent implements OnInit {

  constructor(private _hank: Hank, private _theme2: FlThemeService) {
    this._theme2.set('light');
  }
  // constructor(private _theme2: FlThemeService) { }

  ngOnInit() {
    // this._theme2.set('light');
  }
}
