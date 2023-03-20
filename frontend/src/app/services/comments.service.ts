import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

const baseUrl = 'http://localhost:3000/api/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  
  constructor(private http: HttpClient) { }

  getAll(articleId: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl}?article=${articleId}`);
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
}
