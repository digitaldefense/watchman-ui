export interface Theme {
  name: string;
  primary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  background: string;
  foreground: string;

  // constructor(data: Theme) {
  //   this.name = data.name;
  //   this.primary = data.primary;
  //   this.accent = data.accent;
  //   this.success = data.success;
  //   this.warning = data.warning;
  //   this.danger = data.danger;
  //   this.background = data.background;
  //   this.foreground = data.foreground;

  //   return this;
  // }
}
