import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

const baseUrl = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(baseUrl);
  }

  get(id: any): Observable<Article> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Article[]> {
    return this.http.get<Article[]>(`${baseUrl}?title=${title}`);
  }
}
