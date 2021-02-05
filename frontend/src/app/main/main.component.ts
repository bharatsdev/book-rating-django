import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Book } from '../models/Book';
 import { BookApiService } from '../_services/book-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  books: Book[] = []
  selectedBook = null;
  editBook: Book = null;

  constructor(
    private apiService: BookApiService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const mrToken = this.cookieService.get("mr-token");
    console.log("Token :: ", mrToken)
    if (!mrToken) {
      this.router.navigate(['/auth'])
    }

    this.apiService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
        console.log(this.books)
      },
      error => { console.error(error) }
    );
  }

  selectBooks(book: Book) {
    this.selectedBook = book
    this.editBook = null
  }

  editedBookMain(book: Book) {
    console.log("main edited ", book)
    this.editBook = book
    this.selectedBook = null
  }

  deletedBookEvent(book: Book) {
    //TODO delete from API Service
    this.apiService.deleteBook(book.id).subscribe(
      data => this.books = this.books.filter(m => m.id !== book.id),
      error => console.error(error),
    )
    console.log("deletedBookEvent ", book)
  }

  createBookMain() {
    console.log("createBookMain")
    this.selectedBook = null

    this.editBook = { name: '', author: '',isbn:'', id: null, avg_ratings: 0, no_of_ratings: 0 };
  }

  bookCreatedEvent(book: Book) {
    console.log("Books Count Before ", this.books.length)
    this.books = this.books.filter(m => m.id !== book.id)
    this.books.push(book)
    console.log("Books Count after ", this.books.length)
    this.editBook = null;
  }

  logoutForm = function () {
    console.log("************ Logout*************");
    this.cookieService.delete("mr-token");
    this.router.navigate(['/auth'])
  }
}
