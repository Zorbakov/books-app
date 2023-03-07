import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";
import { Book } from "./book";
import { addNewBookAPI, deleteBookAPI, fetchBooksAPI } from "./books.action";
import { BooksEffect } from "./books.effect";
import { initialState } from "./books.reducer";
import { BooksService } from "./books.service";

describe("Books effects", () => {
    let actions$: Observable<Action> = new Observable<Action>();
    let effects: BooksEffect
    let store: Store
    let booksService: BooksService
    const exampleBooks: Book[] = [
        { id: 1, title: "Da Vinci Code, The", author: "Brown, Dan", publication_date: "2003-03-18" },
        { id: 2, title: "Harry Potter and the Deathly Hallows", author: "Rowling, J.K.", publication_date: "2007-07-21" },
        { id: 3, title: "Harry Potter and the Philosopher's Stone", author: "Rowling, J.K.", publication_date: "1997-06-26" },
        { id: 4, title: "Harry Potter and the Order of the Phoenix", author: "Rowling, J.K.", publication_date: "2003-06-21" },
    ]
    const newBook: Book = { id: 1, title: 'The Lord Of The Rings', author: 'Tolkien, J.R.R.', publication_date: '2023-03-07' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BooksEffect,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
            ],
            imports: [HttpClientModule]
        })
        booksService = TestBed.inject(BooksService)
        effects = TestBed.inject(BooksEffect)
        store = TestBed.inject(Store)
    })

    describe('loadAllBooks$ action', function () {
        it("should call get method from booksService", (done) => {
            jest.spyOn(booksService, "get").mockReturnValue(of(exampleBooks));
            actions$ = of(fetchBooksAPI);
            effects.loadAllBooks$.subscribe(result => {
                expect(result.books.length).toEqual(exampleBooks.length);
                expect(booksService.get).toHaveBeenCalled();
                done();
            })
        })
    });

    describe('addNewBook$ action', function () {
        it("should call addBook method from booksService", (done) => {
            jest.spyOn(booksService, "addBook").mockReturnValue(of(newBook));
            actions$ = of(addNewBookAPI({ book: newBook }));
            effects.addNewBook$.subscribe(result => {
                expect(booksService.addBook).toHaveBeenCalledWith(newBook);
                expect(result.book).toBe(newBook);
                done();
            })
        })
    });

    describe('deleteBook$ action', function () {
        it("should call delete method from booksService", (done) => {
            const deletedBook = exampleBooks[0];
            jest.spyOn(booksService, "delete").mockReturnValue(of(deletedBook));
            actions$ = of(deleteBookAPI({ id: deletedBook.id }));
            effects.deleteBook$.subscribe(result => {
                expect(booksService.delete).toHaveBeenCalledWith(deletedBook.id);
                expect(result.id).toBe(deletedBook.id);
                done();
            })
        })
    });
})