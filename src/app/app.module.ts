import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { WuiModule } from './wui/wui.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { TypePageComponent } from './type-page/type-page.component';
import { FormsPageComponent } from './forms-page/forms-page.component';

const appRoutes: Routes = [
  { path: 'type', component: TypePageComponent },
  { path: 'forms', component: FormsPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TypePageComponent,
    FormsPageComponent
  ],
  imports: [
    BrowserModule,
    WuiModule,
    NgxDatatableModule,
    // FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
