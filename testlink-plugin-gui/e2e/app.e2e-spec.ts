import { WebAppPage } from './app.po';

describe('testlink-plugin App', () => {
  let page: WebAppPage;

  beforeEach(() => {
    page = new WebAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
