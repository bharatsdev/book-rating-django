import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/Book';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
 
  baseUrl = environment.apiUrl;
  baseBookUrl = `${this.baseUrl}api/book/`;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  getBooks() {
    return this.httpClient.get<Book[]>(this.baseBookUrl, { headers: this.getAuthHeaders() });
  }

  fetchBook(bookId: number) {
    return this.httpClient.get<Book>(`${this.baseBookUrl}${bookId}/`, { headers: this.getAuthHeaders() });
  }

  createBook(name: string, author: string,isbn:string) {
    const body = JSON.stringify({ name, author,isbn })

    return this.httpClient.post(`${this.baseBookUrl}`, body, { headers: this.getAuthHeaders() });
  }

  updateBook(id: number, title: string, description: string) {
    const body = JSON.stringify({ id, title, description })
    return this.httpClient.put(`${this.baseBookUrl}${id}/`, body, { headers: this.getAuthHeaders() });
  }

  deleteBook(id: number) {
    return this.httpClient.delete(`${this.baseBookUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  rateBooks(rate: number, bookId: number) {
    const body = JSON.stringify({ stars: rate })
    return this.httpClient.post(`${this.baseBookUrl}${bookId}/rate_book/`, body, { headers: this.getAuthHeaders() });
  }

  userLogin(authData) {
    const body = JSON.stringify(authData)
    return this.httpClient.post(`${this.baseUrl}auth/`, body, { headers: this.getAuthHeaders() });
  }

  registerUser(authData) {
    const body = JSON.stringify(authData)
    return this.httpClient.post(`${this.baseUrl}api/user/`, body, { headers: this.getAuthHeaders() });
  }

  getAuthHeaders() {
    const token = this.cookieService.get("mr-token")

    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: `Token ${token}`
      });
    }

    return new HttpHeaders({
      'Content-Type': 'application/json'
    });

  }
}
