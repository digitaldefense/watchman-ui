import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[wuiDepth]'
})
export class WhiteframeDirective implements OnInit {
  private _depth: number;

  @Input('wuiDepth')
  get depth() { return this._depth; }
  set depth(value: number) {
    if (value == null || !value) {
      this._depth = 4;
    } else {
      this._depth = value;
    }
  }

  constructor(private _element: ElementRef, private _renderer: Renderer2) { }

  ngOnInit() {
    const elem = this._element.nativeElement;
    this._renderer.addClass(elem, `wui-depth-${this.depth}`);
  }
}
