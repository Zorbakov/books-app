import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, map, mergeMap, tap, withLatestFrom } from "rxjs";
import { addNewBookAPI, addNewBookAPISuccess, deleteBookAPI, deleteBookAPISuccess, fetchBooksAPI, fetchBooksAPISuccess } from './books.action';
import { selectBooks } from "./books.selector";
import { BooksService } from "./books.service";

@Injectable()
export class BooksEffect {
    constructor(
        private actions$: Actions,
        private booksService: BooksService,
        private store: Store
    ) { }

    // Effect to retrieve the latest books data
    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchBooksAPI),
            withLatestFrom(this.store.pipe(select(selectBooks))),
            mergeMap(([, booksfromStore]) => {
                if (booksfromStore?.length > 0) {
                    return EMPTY;
                }

                return this.booksService
                    .get()
                    .pipe(map((data) => fetchBooksAPISuccess({ books: data })));
            })
        )
    );

    // Effect to aad a new book to list
    addNewBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addNewBookAPI),
            tap(({ book }) => this.booksService.addBook(book)),
            map(({ book }) => addNewBookAPISuccess({ book }))
        )
    });

    // Effect to delete a book
    deleteBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteBookAPI),
            tap(({ id }) => this.booksService.delete(id)),
            map(({ id }) => deleteBookAPISuccess({ id }))
        )
    })
}