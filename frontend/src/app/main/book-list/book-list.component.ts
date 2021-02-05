import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/models/Book';
import { BookApiService } from 'src/app/_services/book-api.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books: Book[] = []
  @Output() selectBook = new EventEmitter<Book>()
  @Output() editBook = new EventEmitter<Book>()
  @Output() deletedBook = new EventEmitter<Book>()
  @Output() createBook = new EventEmitter()

  edit = faEdit;
  trash = faTrash;
  constructor() {
  }

  ngOnInit(): void {
  }

  bookClicked = function (book: any) {
    console.log(book)
    this.selectBook.emit(book);
  }

  editBookEvent = function (book: Book) {
    console.log("Edit Book  ", book)
    this.editBook.emit(book);
  }

  deleteBookEvent = function (book: Book) {

    console.log("deleteBookEvent ", book)
    this.deletedBook.emit(book);
  }

  newBookEvent = function () {
    console.log("newBookEvent ")
    this.createBook.emit();
  }

}
