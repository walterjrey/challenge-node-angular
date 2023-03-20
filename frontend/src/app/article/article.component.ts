import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles?: Article[];
  currentArticle: Article = {};
  currentIndex = -1;
  title = '';

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.retrieveArticles();
  }

  retrieveArticles(): void {
    this.articlesService.getAll()
      .subscribe({
        next: (data: Article[]) => {
          this.articles = data;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveArticles();
    this.currentArticle = {};
    this.currentIndex = -1;
  }

  setActiveArticle(article: Article, index: number): void {
    console.log('article selected ', article);
    this.currentArticle = article;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentArticle = {};
    this.currentIndex = -1;

    this.articlesService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.articles = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
