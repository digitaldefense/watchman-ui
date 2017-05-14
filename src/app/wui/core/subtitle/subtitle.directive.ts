import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { FlThemeService } from '../../theme2/theme.service';

@Directive({
  selector: '[flSubtitle]',
  host: {
    '[class.subtitle]': 'true'
  }
})
export class SubtitleDirective implements OnInit {

  constructor(private _el: ElementRef, private _renderer: Renderer2, private _theme: FlThemeService) { }

  ngOnInit() {
    const theme = this._theme.theme;
    this._theme.applyColor(this._el, this._renderer, theme['secondaryText']);
    this._theme.applyBgColor(this._el, this._renderer, theme['highlight']);
  }
}
