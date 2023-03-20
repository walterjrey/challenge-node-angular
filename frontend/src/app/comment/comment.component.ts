import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {

  constructor(private commentsService: CommentsService, private route: ActivatedRoute,
    private router: Router) { }

  @Input() viewMode = false;
  comments?: Comment[];
  comment: Comment = {
    body: '',
    author: '',
    articleId: '',
  };
  currentComment: Comment = {
    body: '',
    author: '',
    articleId: '',
    id: ''
  };

  message = '';
  
  @Input() currentArticleId: string = '';
  submitted = false;

  ngOnInit(): void {
    this.getComments();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Input changed', changes);
    this.getComments();
  }

  setEditable(comment: Comment): void {
    this.currentComment = comment;
    this.viewMode = false;
    this.message = '';
    this.submitted = false;
  }

  getComments(): void {
    if (!this.currentArticleId) return;
    console.log(this.currentArticleId);
    this.commentsService.getAll(this.currentArticleId)
      .subscribe({
        next: (data: Comment[]) => {
          this.comments = data;
          console.log(data);
          this.viewMode = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  saveComment(): void {
    const data = {
      body: this.comment.body,
      author: this.comment.author,
      articleId: this.currentArticleId,
    };

    this.commentsService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.message = res.message ? res.message : 'This Comment was created successfully!';
          this.getComments();
        },
        error: (e) => console.error(e)
      });
  }

  newComment(): void {
    this.submitted = false;
    this.comment = {
      body: '',
      author: '',
      articleId: '',
    };
  }

  updateComment(): void {
    this.message = '';

    this.commentsService.update(this.currentComment.id, this.currentComment)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.message = res.message ? res.message : 'This Comment was updated successfully!';
          this.viewMode = true;
        },
        error: (e) => console.error(e)
      });
  }

  deleteComment(): void {
    this.commentsService.delete(this.currentComment.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.message = res.message ? res.message : 'This Comment was deleted successfully!';
          this.getComments();
        },
        error: (e) => console.error(e)
      });
  }
}
