import { browser, by, element } from 'protractor';

export class WebAppPage {
  navigateTo(): any {
    return browser.get('testlink-plugin/instances');
  }

  getParagraphText(): any {
    return element(by.css('testlink-plugin-root > testlink-plugin-elastest-home ' +
      '> td-layout > md-sidenav-container > div.mat-drawer-content > td-layout-nav' +
      '> div > div > testlink-plugin-main > testlink-plugin-dashboard-instance > ' +
      'md-toolbar > div > md-toolbar-row > div > span:nth-child(1)')).getText();
  }
}
