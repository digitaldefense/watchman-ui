import { Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fl-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    '[class.fl-card]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input() padding: string;
  @Input() shadow: number;

  constructor(private _element: ElementRef, private _renderer: Renderer2) { }

  ngOnInit() {
    console.log(this.padding, this.shadow);
    
    const elem = this._element.nativeElement;
    if (this.padding != null || this.padding !== '') {
      this._renderer.setStyle(elem, 'padding', `0 ${this.padding}`);
    } else {
      this._renderer.addClass(elem, 'wui-padding');
    }

    if (this.shadow != null) {
      this._renderer.setStyle(elem, 'box-shadow', `0 ${this.shadow}px`);
    } else {
      console.log('add depth class');
      
      this._renderer.addClass(elem, 'wui-depth-4');
    }
  }
}
