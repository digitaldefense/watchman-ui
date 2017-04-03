import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

const modules = [
  CommonModule,
  FlexLayoutModule,
  FormsModule
];

@NgModule({
  imports: [...modules],
  providers: [],
})
export class WuiModule { }
