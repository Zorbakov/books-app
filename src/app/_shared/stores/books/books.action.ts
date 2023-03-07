import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const fetchBooksAPI = createAction(
    '[Books API] Fetch Books API',
);

export const fetchBooksAPISuccess = createAction(
    '[Books API] Fetch Books API success',
    props<{ books: Book[] }>()
)

export const addNewBookAPI = createAction(
    '[Books API] Add new book API',
    props<{ book: Book }>()
)

export const addNewBookAPISuccess = createAction(
    '[Books API] Add new book API success',
    props<{ book: Book }>()
)

export const deleteBookAPI = createAction(
    '[Books API] Invoke delete book API',
    props<{ id: number }>()
)

export const deleteBookAPISuccess = createAction(
    '[Books API] Invoke delete book API success',
    props<{ id: number }>()
)