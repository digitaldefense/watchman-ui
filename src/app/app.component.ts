import { Component, ElementRef, Injectable, OnInit, Renderer2 } from '@angular/core';

import { Theme } from './wui/theme/theme.tmpl';
// import { WuiThemeService } from './wui/theme/theme.service';
import { FlThemeService } from './wui/theme2/theme.service';

@Component({
  selector: 'wui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FlThemeService]
})
export class AppComponent {

  constructor(private _theme2: FlThemeService) {
    this._theme2.set('teal-lightBlue-light');
  }
}
