import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CommentComponent } from './comment/comment.component';
import { ArticleAddComponent } from './article-add/article-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'articles', component: ArticleComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'add', component: ArticleAddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleDetailsComponent,
    CommentComponent,
    ArticleAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
