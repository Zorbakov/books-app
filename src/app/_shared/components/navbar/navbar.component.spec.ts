
import { Location } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from "../../../../../src/app/pages/home/home.component";
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let router: Router;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: "", component: HomeComponent }
                ])
            ],
            declarations: [
                HomeComponent,
                NavbarComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to home when clicking navbar-brand', fakeAsync(() => {
        fixture.ngZone?.run(() => {
            router.initialNavigation();
            router.navigateByUrl('/');
        });
        tick();
        fixture.debugElement.query(By.css('.navbar-brand')).nativeElement.click();
        expect(router.url).toBe('/');
    }));
});
