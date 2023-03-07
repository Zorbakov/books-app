import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html'
})
export class BannerComponent {
    @Input() title?: string;
    @Input() subtitle?: string;
}
