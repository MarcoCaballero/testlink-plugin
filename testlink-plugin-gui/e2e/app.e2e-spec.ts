import { WebAppPage } from './app.po';

describe('testlink-plugin App', () => {
  let page: WebAppPage;

  beforeEach(() => {
    page = new WebAppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('TestLink New Instance');
  });
});
