import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig2 {
  private _themeName = 'light';
  private _theme = {};

  set theme(name: any) { this._theme = name; }
  get theme(): any { return this._theme; }

  set themeName(name: string) { this._themeName = name; }
  get themeName(): string { return this._themeName; }
}
