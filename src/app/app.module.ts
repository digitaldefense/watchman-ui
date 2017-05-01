import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

const appRoutes: Routes = [
  { path: 'avatar', component: AvatarPageComponent },
  { path: 'button', component: ButtonPageComponent },
  { path: 'colors', component: ColorsPageComponent },
  { path: 'forms', component: FormsPageComponent },
  { path: 'icon', component: IconPageComponent },
  { path: 'inputs', component: InputsPageComponent },
  { path: 'lists', component: ListPageComponent },
  { path: 'card', component: CardPageComponent },
  { path: 'section', component: SectionPageComponent },
  { path: 'shadow', component: ShadowPageComponent },
  { path: 'toolbar', component: ToolbarPageComponent },
  { path: 'type', component: TypePageComponent },
];

@NgModule({
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
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    WuiModule,
    NgxDatatableModule,
    // FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    WuiThemeService,
    THEMES,
    { provide: 'AppConfig', useValue: { name: 'purple-green' }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
