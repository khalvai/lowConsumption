import { Inject, Injectable } from "@nestjs/common";
import { PoolClient } from "pg";
import { IPoolClient } from "src/db/ConnectionInterface";

export interface Article
{
  id: number;
  title: string;
  content: string;
  author_id: number;
}
export interface Comment
{
  id: number;
  body: string;
  article_id: number;
}

export interface ResponseArticle extends Article
{
  comments: Comment[];

}

@Injectable()
export class AppService
{

  public constructor (@Inject(IPoolClient) private readonly connection: PoolClient)
  {
  }
  public async getPostWithTags(userId: number): Promise<unknown[]>
  {


    const articles = (await this.connection.query(`SELECT * FROM articles WHERE author_id=${ userId };`)).rows as Article[];

    const responseArticles: ResponseArticle[] = [];
    for (const article of articles)
    {

      const comments = (await this.connection.query(`SELECT * FROM comments WHERE article_id=${ articles[ 0 ].id }`)).rows as Comment[];

      responseArticles.push({
        ...article,
        comments: comments

      });


    }





    return responseArticles;



  }
}



