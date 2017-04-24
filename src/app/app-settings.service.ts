import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {
  private _theme = 'dark';

  set theme(name: string) {
    this._theme = name;
  }
  get theme(): string {
    return this._theme;
  }
}
