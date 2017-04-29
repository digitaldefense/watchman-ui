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

const appRoutes: Routes = [
  { path: 'avatar', component: AvatarPageComponent },
  { path: 'colors', component: ColorsPageComponent },
  { path: 'type', component: TypePageComponent },
  { path: 'forms', component: FormsPageComponent },
  { path: 'inputs', component: InputsPageComponent },
  { path: 'lists', component: ListPageComponent },
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
    { provide: 'AppConfig', useValue: { name: 'dark' }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
