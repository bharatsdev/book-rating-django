import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/app/models/Book';
import { BookApiService } from 'src/app/_services/book-api.service';
 
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number = null;
  @Output() bookCreated = new EventEmitter<Book>();

  @Input() set book(val: Book) {
    this.bookId = val.id;
    console.log("Book id >>>> " + this.bookId)
    this.bookForm = new FormGroup({
        name: new FormControl(val.name),
        author: new FormControl(val.author),
        isbn: new FormControl(val.isbn),
      }
    );
  }

  constructor(private apiService: BookApiService) { }

  ngOnInit(): void {
  }

  saveForm() {
    if (this.bookId) {
      this.apiService.updateBook(this.bookId, this.bookForm.value.title, this.bookForm.value.description).subscribe(
        (data: Book) => {
          console.log(data)
          this.bookCreated.emit(data)
        },
        err => console.error(err)
      )
    } else {
      this.apiService.createBook(
        this.bookForm.value.name, 
        this.bookForm.value.author,
        this.bookForm.value.isbn
        ).subscribe(
        (data: Book) => {
          console.log(data)
          this.bookCreated.emit(data)
        },
         err => console.error(err)
      )
    }
    console.log("Forms Value :: ", this.bookForm.value)
  }

  disableFormAction=function(){
    console.log("kkkkk",this.bookForm.value.name)
    console.log("kkkkk length :: ",this.bookForm.value.name.length)
    if(this.bookForm.value.name){
      return false
    }
    return true
  }

}
