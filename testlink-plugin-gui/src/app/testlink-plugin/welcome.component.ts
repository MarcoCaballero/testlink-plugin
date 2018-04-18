import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'testlink-plugin-welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['main.component.scss'],
})

export class WelcomeComponent {
    constructor(private router: Router) { }

    navigateHome(): void {
        this.router.navigate(['/testlink-plugin/instances']);
    }
}
