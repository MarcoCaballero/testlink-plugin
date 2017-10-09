import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'testlink-plugin-elastest-home',
    templateUrl: 'elastest-home.component.html',
})

export class ElastestHomeComponent {
    constructor(private router: Router) { }

    navigateHome(): void {
        this.router.navigate(['/teslink-plugin']);
    }
}
