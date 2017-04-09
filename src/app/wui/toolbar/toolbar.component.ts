import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';


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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class WuiToolbarComponent {

  private _color: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  /** The color of the toolbar. Can be primary, accent, or warn. */
  @Input()
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._updateColor(value);
  }

  private _updateColor(newColor: string) {
    // this._setElementColor(this._color, false);
    this._setElementColor(newColor);
    this._color = newColor;
  }

  private _setElementColor(color: string) {
    if (color != null && color !== '') {
      this.renderer.addClass(this.elementRef.nativeElement, `wui-${color}-bg`);
    }
    else {
      this.renderer.addClass(this.elementRef.nativeElement, `wui-default-bg`);
    }
  }

}