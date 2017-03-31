import { WatchUiPage } from './app.po';

describe('watch-ui App', () => {
  let page: WatchUiPage;

  beforeEach(() => {
    page = new WatchUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('wui works!');
  });
});
