import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { addNewBookAPISuccess, fetchBooksAPISuccess, deleteBookAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
    initialState,
    on(fetchBooksAPISuccess, (_state, { books }) => {
        return books;
    }),
    on(addNewBookAPISuccess, (state, { book }) => {
        let newState = [...state];
        newState.unshift(book);
        return newState;
    }),
    on(deleteBookAPISuccess, (state, { id }) => {
        let newState = state.filter((_) => _.id != id);
        return newState;
    })
);
