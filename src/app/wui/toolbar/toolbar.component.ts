import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  Directive,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';

// import { WuiThemeService } from '../theme/theme.service';
import { FlThemeService } from '../theme2/theme.service';
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
export class FlToolbarComponent implements OnInit {
  private theme: Theme;
  private _color: string;
  private _shadow: number = 4;

  @Input()
  get shadow() { return this._shadow; }
  set shadow(value: number) { this._shadow = value; }

  @Input()
  set color(value: string) { this._color = value; }
  get color() { return this._color; }

  constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) { }

  ngOnInit() {
    this.theme = this._themeSvc.theme;
    this._setElementColor(this.color);
  }

  private _setElementColor(color: string) {
    if (color != null && color !== '') {
      this._themeSvc.applyBgColor(this._element, this._renderer, color);
    } else {
      this._renderer.setStyle(this._element.nativeElement, 'background-color', this.theme['toolbar']);
    }
  }
}
