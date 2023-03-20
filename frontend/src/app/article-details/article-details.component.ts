import { Component, OnInit, Input, Output } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentArticle: Article = {
    title: '',
    body: '',
    author: '',
    id: ''
  };

  message = '';

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getArticle(this.route.snapshot.params["id"]);
    }
  }

  getArticle(id: string): void {
    this.articlesService.get(id)
      .subscribe({
        next: (data) => {
          this.currentArticle = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateArticle(): void {
    this.message = '';

    this.articlesService.update(this.currentArticle.id, this.currentArticle)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Article was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteArticle(): void {
    this.articlesService.delete(this.currentArticle.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/articles']);
        },
        error: (e) => console.error(e)
      });
  }
}
