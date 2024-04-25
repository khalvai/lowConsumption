import { Inject, Injectable } from "@nestjs/common";
import { PoolClient } from "pg";
import { IPoolClient } from "src/db/ConnectionInterface";

export interface Article {
  id: number;
  title: string;
  content: string;
  author_id: number;
}
export interface Comment {
  id: number;
  body: string;
  article_id: number;
}

export interface ResponseArticle extends Article {
  comments?: Comment[];

}

@Injectable()
export class AppService {

  public constructor(@Inject(IPoolClient) private readonly connection: PoolClient) {
  }


  public async getArticlesWithComments(userId: number): Promise<ResponseArticle[]> {

    const articles = (await this.connection.query(`SELECT * FROM articles WHERE author_id=${userId};`)).rows as Article[];

    const responseArticles: ResponseArticle[] = [];

    for (const article of articles) {

      const comments = (await this.connection.query(`SELECT * FROM comments WHERE article_id=${articles[0].id}`)).rows as Comment[];

      responseArticles.push({
        ...article,
        comments: comments

      });

    }

    return responseArticles;

  }

  public async getArticlesWithComments2(userId: number): Promise<unknown[]> {


    const articles = (await this.connection.query(`SELECT * FROM articles WHERE author_id=${userId};`)).rows as Article[];

    const articleIds: number[] = [];


    for (const article of articles) {
      articleIds.push(article.id);

    }


    const query = `(${articleIds.join(',')})`;



    const comments = (await this.connection.query(`SELECT * FROM comments WHERE article_id IN ${query}`)).rows as Comment[];


    const responseArticles: ResponseArticle[] = this.matchCommentsToArticle(articles, comments)
    return responseArticles;

  }

  private matchCommentsToArticle(articles: Article[], comments: Comment[]): ResponseArticle[] {


    const responseArticles: ResponseArticle[] = [];


    for (const article of articles) {

      const responseArticle: ResponseArticle = {
        id: article.id,
        title: article.title,
        content: article.content,
        author_id: article.author_id,
        comments: []
      };
      for (const comment of comments) {

        if (comment.article_id === article.id) {

          responseArticle.comments.push({
            id: comment.id,
            body: comment.body,
            article_id: comment.article_id
          });

        }
      }
      responseArticles.push(responseArticle);

    }

    return responseArticles;
  }


}

