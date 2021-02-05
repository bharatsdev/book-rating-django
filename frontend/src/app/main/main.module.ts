import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BookApiService } from '../_services/book-api.service';
import { AuthorComponent } from './author/author.component';
import { BookAuthorComponent } from './book-author/book-author.component';

const routes: Routes = [
  { path: 'books', component: MainComponent }
]

@NgModule({
  declarations: [
    MainComponent,
    BookFormComponent,
    BookDetailsComponent,
    BookListComponent,
    AuthorComponent,
    BookAuthorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [BookApiService]
})
export class MainModule { }
