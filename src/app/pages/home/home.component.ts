import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Book } from '../../../../src/app/_shared/stores/books/book';
import { addNewBookAPI, deleteBookAPI, fetchBooksAPI } from '../../../../src/app/_shared/stores/books/books.action';
import { selectBooks } from '../../../../src/app/_shared/stores/books/books.selector';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public books: Book[] = [];
    public form: FormGroup = new FormGroup({
        title: new FormControl(''),
        author: new FormControl(''),
        publication_date: new FormControl(''),
    });

    public submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.getAllBooks();
    }

    /**
     * Method to validate user input of the #form
     */
    public submit(): void {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        const newBook: Book = {
            id: this.books.length + 1,
            title: this.form.value.title,
            author: this.form.value.author,
            publication_date: this.form.value.publication_date
        };

        this.store.dispatch(addNewBookAPI({ book: newBook }));
        this.resetForm();
    }

    /**
     * Reset the reactive form
     */
    public resetForm(): void {
        this.submitted = false;
        this.form.reset();
    }

    /**
     * Delete book based on id number
     * @param id 
     */
    public deleteBook(id: number): void {
        this.store.dispatch(deleteBookAPI({ id }));
        this.getAllBooks();
    }

    /**
     * Get method to retrieve a specific form control
     */
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    /**
     * Initialize the form in terms of validators
     */
    private initForm(): void {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            author: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            publication_date: ['', [Validators.required]]
        });
    }

    /**
     * Dispatch the invoke books api action
     */
    private getAllBooks(): void {
        this.store.pipe(select(selectBooks)).subscribe(books => {
            const array = [...books];
            this.books = array.sort((a: Book, b: Book) => (a.title < b.title) ? -1 : 1);
        });
        this.store.dispatch(fetchBooksAPI());
    }
}

