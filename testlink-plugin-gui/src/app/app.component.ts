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
    this._iconRegistry.addSvgIconInNamespace('assets', 'testlink',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/testlink.svg'));
  }
}
