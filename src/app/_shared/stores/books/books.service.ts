import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Book } from "./book";

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    constructor(private httpClient: HttpClient) { }

    /**
     * Get method to retrieve all available books
     */
    public get() {
        return this.httpClient.get<Book[]>('http://localhost:3000/books');
    }

    /**
     * Post method to add a new book to the list of books
     * @param book 
     */
    public addBook(book: Book) {
        return this.httpClient.post<Book>('http://localhost:3000/books', book);
    }

    /**
     * Delete method to delete a specific book by id
     * @param id 
     */
    public delete(id: number) {
        return this.httpClient.delete<Book>(`http://localhost:3000/books/${id}`);
    }
}