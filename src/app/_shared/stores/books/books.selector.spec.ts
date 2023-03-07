import { Book } from "./book";
import { selectBooks } from "./books.selector";

describe('Book selectors', () => {
    let initialState: { books: Book[] } = {
        books: [
            { id: 1, title: "Da Vinci Code, The", author: "Brown, Dan", publication_date: "2003-03-18" },
            { id: 2, title: "Harry Potter and the Deathly Hallows", author: "Rowling, J.K.", publication_date: "2007-07-21" },
            { id: 3, title: "Harry Potter and the Philosopher's Stone", author: "Rowling, J.K.", publication_date: "1997-06-26" },
            { id: 4, title: "Harry Potter and the Order of the Phoenix", author: "Rowling, J.K.", publication_date: "2003-06-21" },
        ]
    };

    it('should get the books', () => {
        const result = selectBooks.projector(initialState.books);
        expect(result.length).toBe(4);
    });
});