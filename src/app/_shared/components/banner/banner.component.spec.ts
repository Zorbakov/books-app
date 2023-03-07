import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [
                BannerComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it(`Should display a title when data is available'`, () => {
        component.title = 'Books in style';
        component.subtitle = 'Search for the ultimate story that excites you';

        expect(component.title).toBeTruthy();
        expect(component.subtitle).toBeTruthy();
    });

    it(`Should not display content by default'`, () => {
        component.title = '';
        component.subtitle = '';

        expect(component.title).toBeFalsy();
        expect(component.subtitle).toBeFalsy();
    });
});
