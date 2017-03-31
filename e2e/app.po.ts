import { browser, element, by } from 'protractor';

export class WatchUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('wui-root h1')).getText();
  }
}
