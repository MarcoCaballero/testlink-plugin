import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'testlink-plugin-welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['main.component.scss'],
})

export class WelcomeComponent {
    logos: any[] = [
        { name: 'angular', logo: 'assets:angular' },
        { name: 'spring', logo: 'assets:spring' },
        { name: 'travis', logo: 'assets:travis' },
    ];
    logosBottom: any[] = [
        { name: 'docker', logo: 'assets:docker' },
        { name: 'covalent', logo: 'assets:covalent-mark' },
        { name: 'elastest-rep', logo: 'assets:elastest-rep' },
    ];

    constructor(private router: Router) { }

    navigateHome(): void {
        this.router.navigate(['/testlink-plugin/instances']);
    }
}
