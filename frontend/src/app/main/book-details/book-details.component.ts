import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/models/Book';
 import { BookApiService } from 'src/app/_services/book-api.service';
 
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input() book: Book;
  @Output() updatedBook = new EventEmitter<Book>()

  rateHovered = 0;
  faStar = faStar;

  constructor(private apiService: BookApiService) { }

  ngOnInit(): void {
  }

  rateHover = function (rate: number) {
    this.rateHovered = rate;
    console.log("User Ratings ", rate)
  }

  rateClicked = function (rate: number) {
    this.apiService.rateBooks(rate, this.book.id).subscribe(
      (result: any) => {
        console.log(result);
        this.getBookDetails()
      },
      (error: any) => {
        console.log(error)
      },

    );

    console.log("Selected book ", this.book.id)
    console.log("User Ratings ", rate)
  }

  getBookDetails() {
    this.apiService.fetchBook(this.book.id).subscribe(
      (book: Book) => this.updatedBook.emit(book),
      err => { console.log(err) },
    )
  }
}
