import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

import { FlThemeService } from '../theme2/theme.service';

@Component({
  selector: '[flSubheader]',
  template: '<ng-content></ng-content>',
  styleUrls: ['subheader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.fl-subheader]': 'true'
  }
})
export class SubheaderComponent implements OnInit {

  constructor(private _el: ElementRef, private _renderer: Renderer2, private _theme: FlThemeService) { }

  ngOnInit() {
    const theme = this._theme.theme;
    this._theme.applyColor(this._el, this._renderer, theme['secondaryText']);
    this._theme.applyBgColor(this._el, this._renderer, theme['highlight']);
  }
}
