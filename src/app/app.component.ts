import { Component, OnInit } from '@angular/core';

import { WuiThemeService } from './wui/core/color/theme.service';

@Component({
  selector: 'wui-root',
  providers: [WuiThemeService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (private _themeSvc: WuiThemeService) {
    _themeSvc.theme = 'light';
  }

  ngOnInit() {
    // this.themes = this._theme.getThemes();
    // console.log(this.themes);
  }
}
