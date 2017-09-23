import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElastestHomeComponent } from './elastest-home/elastest-home.component';

const routes: Routes = [
    {
        path: '',
        component: ElastestHomeComponent,
        children: [
            {
                path: '',
                loadChildren: './testlink-plugin/main.module#MainModule',
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    ElastestHomeComponent
];
