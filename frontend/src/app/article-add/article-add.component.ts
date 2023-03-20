import { Component } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent {
  article: Article = {
    title: '',
    body: '',
    author: ''
  };
  submitted = false;

  constructor(private articlesService: ArticlesService) { }

  saveArticle(): void {
    const data = {
      title: this.article.title,
      body: this.article.body,
      author: this.article.author
    };

    this.articlesService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newArticle(): void {
    this.submitted = false;
    this.article = {
      title: '',
      body: '',
      author: ''
    };
  }
}
