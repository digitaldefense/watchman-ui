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

// ============ STUFF THAT WILL BE USEFUL LATER ============================= //

// import {
//   ContentChild,
//   Component,
//   Directive,
//   ChangeDetectionStrategy,
//   ElementRef,
//   Input,
//   OnInit,
//   Renderer2,
//   ViewEncapsulation
// } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { WuiThemeService } from '../theme/theme.service';
// import { Theme } from '../theme/theme.tmpl';

// @Directive({
//   selector: 'wui-card-title',
//   host: {
//     '[class.wui-card-title]': 'true'
//   }
// })
// export class WuiCardTitle implements OnInit {
//   protected theme: Theme;

//   constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: WuiThemeService) {
//     this.theme = _themeSvc.theme;
//   }

//   ngOnInit() {
//     const elem = this._element.nativeElement;
//     const accent = this.theme.accent;
//     const styleValue = `linear-gradient(to right, ${accent}, ${accent} 50px, rgba(0, 0, 0, 0) 50px)`;
//     this._renderer.setStyle(elem, 'border-image', styleValue);
//   }
// }

// @Directive({
//   selector: 'wui-card-subtitle',
//   host: {
//     '[class.wui-card-subtitle]': 'true'
//   }
// })
// export class WuiCardSubtitle {}

// @Directive({
//   selector: 'wui-card-controls',
//   host: {
//     '[class.wui-card-controls]': 'true'
//   }
// })
// export class WuiCardControls {}

// @Directive({
//   selector: 'wui-card-body',
//   host: {
//     '[class.wui-card-body]': 'true'
//   }
// })
// export class WuiCardBody {}

// @Directive({
//   selector: 'wui-card-footer',
//   host: {
//     '[class.wui-card-footer]': 'true'
//   }
// })
// export class WuiCardFooter {}

// @Directive({
//   selector: 'wui-card-actions',
//   host: {
//     '[class.wui-card-actions]': 'true'
//   }
// })
// export class WuiCardActions {}

// @Component({
//   selector: 'section[wui-card], wui-card',
//   templateUrl: './card.component.html',
//   styleUrls: ['./card.component.scss'],
//   host: {
//     '[class.wui-card]': 'true'
//   },
//   encapsulation: ViewEncapsulation.None
// })
// export class WuiCardComponent {
//   @Input() title: string;
// }

// @Component({
//   selector: 'wui-card-header',
//   templateUrl: './card-header.component.html',
//   host: {
//     '[class.wui-card-header]': 'true'
//   },
//   encapsulation: ViewEncapsulation.None
// })
// export class WuiCardHeaderComponent implements OnInit {
//   protected theme: Theme;

//   constructor(private _themeSvc: WuiThemeService, private _element: ElementRef, private _renderer: Renderer2) {
//     this.theme = _themeSvc.theme;
//   }

//   ngOnInit() {
//     const elem = this._element.nativeElement;
//     this._renderer.setStyle(elem, 'border-bottom-color', this.theme.accent);
//   }
// }

// @Component({
//   selector: 'wui-card-title-group',
//   templateUrl: './card-title-group.component.html',
//   host: {
//     '[class.wui-card-title-group]': 'true'
//   },
//   encapsulation: ViewEncapsulation.None
// })
// export class WuiCardTitleGroupComponent {}
