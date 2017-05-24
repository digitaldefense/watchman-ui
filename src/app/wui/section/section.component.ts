import {
  ContentChild,
  Component,
  Directive,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlThemeService } from '../theme2/theme.service';
import { Theme } from '../theme/theme.tmpl';

@Directive({
  selector: 'fl-section-title',
  host: {
    '[class.fl-section-title]': 'true'
  }
})
export class FlSectionTitle implements OnInit {
  protected theme: Theme;

  constructor(private _element: ElementRef, private _renderer: Renderer2, private _themeSvc: FlThemeService) {
    this.theme = _themeSvc.theme;
  }

  ngOnInit() {
    const elem = this._element.nativeElement;
    const accent = this.theme['accent'];
    const styleValue = `linear-gradient(to right, ${accent}, ${accent} 50px, rgba(0, 0, 0, 0) 50px)`;
    this._renderer.setStyle(elem, 'border-image', styleValue);
  }
}

@Directive({
  selector: 'fl-section-subtitle',
  host: {
    '[class.fl-section-subtitle]': 'true'
  }
})
export class FlSectionSubtitle {}

@Directive({
  selector: 'fl-section-controls',
  host: {
    '[class.fl-section-controls]': 'true'
  }
})
export class FlSectionControls {}

@Directive({
  selector: 'fl-section-body',
  host: {
    '[class.fl-section-body]': 'true'
  }
})
export class FlSectionBody {}

// @Directive({
//   selector: 'wui-card-footer',
//   host: {
//     '[class.fl-section-footer]': 'true'
//   }
// })
// export class WuiCardFooter {}

// @Directive({
//   selector: 'wui-card-actions',
//   host: {
//     '[class.fl-section-actions]': 'true'
//   }
// })
// export class WuiCardActions {}

@Component({
  selector: 'section[fl-section], fl-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  host: {
    '[class.fl-section]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class FlSectionComponent {
  @Input() title: string;
}

@Component({
  selector: 'fl-section-header',
  templateUrl: './section-header.component.html',
  host: {
    '[class.fl-section-header]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class FlSectionHeaderComponent implements OnInit {
  protected theme: Theme;

  constructor(private _themeSvc: FlThemeService, private _element: ElementRef, private _renderer: Renderer2) {
    this.theme = _themeSvc.theme;
  }

  ngOnInit() {
    const elem = this._element.nativeElement;
    this._renderer.setStyle(elem, 'border-bottom-color', this.theme.accent);
  }
}

@Component({
  selector: 'fl-section-title-group',
  templateUrl: './section-title-group.component.html',
  host: {
    '[class.fl-section-title-group]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class FlSectionTitleGroupComponent {}
