
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { BannerComponent } from "../../../../src/app/_shared/components/banner/banner.component";
import { BooksEffect } from '../../../../src/app/_shared/stores/books/books.effect';
import { bookReducer } from '../../../../src/app/_shared/stores/books/books.reducer';
import { HomeComponent } from "./home.component";

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    const newBook = {
        title: 'The Lord Of The Rings',
        author: 'Tolkien, J.R.R.',
        publication_date: '2023-03-07'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ToastrModule.forRoot(),
                HttpClientModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('books', bookReducer),
                EffectsModule.forRoot({}),
                EffectsModule.forFeature([BooksEffect]),
            ],
            declarations: [
                HomeComponent,
                BannerComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should contain right form structure', () => {
        const formElement = fixture.debugElement.nativeElement.querySelector('#form');
        const inputElements = formElement.querySelectorAll('input');
        expect(inputElements.length).toEqual(3);
    });

    it('should contain form with initial values', () => {
        const formgroup = component.form;
        const initialValues = {
            title: '',
            author: '',
            publication_date: '',
        };

        expect(formgroup.value).toEqual(initialValues);
    });

    it('Should contain validate the form when filled in', () => {
        const formElement = fixture.debugElement.nativeElement.querySelector('#form');
        const inputElements = formElement.querySelectorAll('input');

        const titleInput: HTMLInputElement = inputElements[0];
        const authorInput: HTMLInputElement = inputElements[1];
        const publicationDateInput: HTMLInputElement = inputElements[2];

        titleInput.value = newBook.title;
        authorInput.value = newBook.author;
        publicationDateInput.valueAsDate = new Date(newBook.publication_date);

        titleInput.dispatchEvent(new Event('input'));
        authorInput.dispatchEvent(new Event('input'));
        publicationDateInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const isFormValid = component.form.valid;
        expect(isFormValid).toBeTruthy();
    });

    it('Should contain an error when title in form is missing', () => {
        const formElement = fixture.debugElement.nativeElement.querySelector('#form');
        const inputElements = formElement.querySelectorAll('input');
        const formgroup = component.form;
        const titleFormGroup = formgroup.get('title');

        const titleInput: HTMLInputElement = inputElements[0];
        titleInput.value = '';
        titleInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const isFormValid = component.form.valid;
        expect(isFormValid).toBeFalsy();
        expect(titleInput.value).toEqual('');
        expect(titleFormGroup && titleFormGroup.errors).not.toBeNull();
    });
});
