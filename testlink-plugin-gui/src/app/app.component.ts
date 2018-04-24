import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'testlink-plugin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private _iconRegistry: MdIconRegistry,
    private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'linkedin',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'elastest',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/elastest.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'elastest-rep',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/elastest-rep.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'testlink',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/testlink.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'testlink-alpha',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/testlink-mini-alpha.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'angular',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/angular.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'spring',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/spring.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'travis',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/travis.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'docker',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/docker.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-covalent.svg'));
  }
}
