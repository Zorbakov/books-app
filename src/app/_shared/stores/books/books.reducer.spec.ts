import { Action } from "@ngrx/store";
import { Book } from "./book";
import { addNewBookAPISuccess, fetchBooksAPISuccess, deleteBookAPISuccess } from "./books.action";
import * as fromReducer from './books.reducer';

describe('Books Reducer', () => {
    const { initialState, bookReducer } = fromReducer;
    const newBook: Book = { id: 1, title: 'The Lord Of The Rings', author: 'Tolkien, J.R.R.', publication_date: '2023-03-07' };
    const exampleBooks: Book[] = [
        { id: 1, title: "Da Vinci Code, The", author: "Brown, Dan", publication_date: "2003-03-18" },
        { id: 2, title: "Harry Potter and the Deathly Hallows", author: "Rowling, J.K.", publication_date: "2007-07-21" },
        { id: 3, title: "Harry Potter and the Philosopher's Stone", author: "Rowling, J.K.", publication_date: "1997-06-26" },
        { id: 4, title: "Harry Potter and the Order of the Phoenix", author: "Rowling, J.K.", publication_date: "2003-06-21" },
    ]

    it('should return initial state if the action is unknown', () => {
        const action: Action = { type: 'Unknown' };
        const state = bookReducer(initialState, action);
        expect(state).toBe(initialState);
    });

    describe('booksFetchAPISuccess action', function () {
        it('should have a list of books after loading books', () => {
            const action = fetchBooksAPISuccess({ books: exampleBooks });
            const books = bookReducer(initialState, action);
            expect(books.length).toEqual(4);
            expect(books).toEqual(exampleBooks);
        });
    });

    describe('addNewBookAPISuccess action', function () {
        it('should add a new book to the list', () => {
            const action = addNewBookAPISuccess({ book: newBook });
            const books = bookReducer(initialState, action);
            expect(books[0]).toBe(newBook);
            expect(books.length).toEqual(1);
        });
    });

    describe('deleteBookAPISuccess action', function () {
        it('should delete a book from the list', () => {
            const initialState = exampleBooks;
            const action = deleteBookAPISuccess({ id: exampleBooks[0].id });
            const books = bookReducer(initialState, action);
            expect(books.length).toEqual(3);
        });
    });
});