import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// import { WuiModule, WuiThemeService, THEMES } from './wui/wui.module';
import { WuiModule } from './wui/wui.module';
import { WuiThemeService } from './wui/theme/theme.service';
import { THEMES } from './wui/theme/themes';
// import { WuiColorDirective } from './wui/theme/color.directive';
// import { WuiLinkColorDirective } from './wui/theme/color.directive';
// ===


// import { FlThemeService } from './wui/theme2/theme.service';
// import { ThemePresets } from './wui/theme2/presets';
import { FlThemeModule } from './wui/theme2/theme.module';
// import { FluxModule } from './flux/flux.module';

import { AppConfig2 } from './app-config.service';
import { AppComponent } from './app.component';
import { TypePageComponent } from './type-page/type-page.component';
import { FormsPageComponent } from './forms-page/forms-page.component';
import { InputsPageComponent } from './inputs-page/inputs-page.component';
import { ColorsPageComponent } from './colors-page/colors-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { AvatarPageComponent } from './avatar-page/avatar-page.component';
import { ShadowPageComponent } from './shadow-page/shadow-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { PageComponent } from './page/page.component';
import { ToolbarPageComponent } from './toolbar-page/toolbar-page.component';
import { SectionPageComponent } from './section-page/section-page.component';
import { IconPageComponent } from './icon-page/icon-page.component';
import { ButtonPageComponent } from './button-page/button-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { AccordionPageComponent } from './accordion-page/accordion-page.component';
import { FormattingPageComponent } from './formatting-page/formatting-page.component';
import { GridPageComponent } from './grid-page/grid-page.component';
import { DrawerPageComponent } from './drawer-page/drawer-page.component';
import { SnackBarPageComponent } from './snack-bar-page/snack-bar-page.component';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
// import { FluxComponent } from './flux/flux.component';

// Dialog demos
import {
  SimpleDialogDemo,
  ConfirmDialogDemo
} from './dialog-page/dialog-page.component';
import { SliderPageComponent } from './slider-page/slider-page.component';

const appRoutes: Routes = [
  { path: 'accordion', component: AccordionPageComponent },
  { path: 'avatar', component: AvatarPageComponent },
  { path: 'button', component: ButtonPageComponent },
  { path: 'colors', component: ColorsPageComponent },
  { path: 'dialog', component: DialogPageComponent },
  { path: 'drawer', component: DrawerPageComponent },
  { path: 'formatting', component: FormattingPageComponent },
  { path: 'forms', component: FormsPageComponent },
  { path: 'gridlist', component: GridPageComponent },
  { path: 'icon', component: IconPageComponent },
  { path: 'inputs', component: InputsPageComponent },
  { path: 'lists', component: ListPageComponent },
  { path: 'card', component: CardPageComponent },
  { path: 'section', component: SectionPageComponent },
  { path: 'shadow', component: ShadowPageComponent },
  { path: 'slider', component: SliderPageComponent },
  { path: 'snackbar', component: SnackBarPageComponent },
  { path: 'toolbar', component: ToolbarPageComponent },
  { path: 'type', component: TypePageComponent },
  { path: 'menu', component: MenuPageComponent },

  // { path: 'flux', loadChildren: 'flux/flux.module#FluxComponent' }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FlThemeModule,
    // FluxModule,
    WuiModule,
    NgxDatatableModule,
    // FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    TypePageComponent,
    FormsPageComponent,
    InputsPageComponent,
    ColorsPageComponent,
    ListPageComponent,
    AvatarPageComponent,
    ShadowPageComponent,
    CardPageComponent,
    PageComponent,
    ToolbarPageComponent,
    SectionPageComponent,
    IconPageComponent,
    ButtonPageComponent,
    MenuPageComponent,
    AccordionPageComponent,
    FormattingPageComponent,
    GridPageComponent,
    DrawerPageComponent,
    SnackBarPageComponent,
    DialogPageComponent,
    // FluxComponent,

    SimpleDialogDemo,
    ConfirmDialogDemo,
    SliderPageComponent
  ],
  entryComponents: [
    SimpleDialogDemo,
    ConfirmDialogDemo
  ],
  providers: [
    // FlThemeService,
    // ThemePresets,
    AppConfig2,
    WuiThemeService,
    THEMES,
    { provide: 'AppConfig', useValue: { name: 'dark' }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
