## A project for educational purpose to demonstrate Monitoring Concepts

## What is monitoring ?

        >   "collecting, processing, aggregating, and displaying real-time quantitative data about your system." -- Google SRE book.

        >   "need to observe your systems to get insight  into: request/event rate, Latency, Errors, Resource usage, temperature .. and
            then react when something looks bad." -- prometheus Co-founder

## Technology Used:

-   **node_exporter** : a tool to expose state of server,such as cpu and memory usage of server to be scraped and used by other parts.
-   **prometheus** : is a free software application used for event monitoring and alerting. It records metrics in a time series database built using an HTTP pull model from node_exporter(in this scenario).
-   **Grafana**: is a multi-platform open source analytics and interactive visualization web application, the project used prometheus as data sourcse for grafan, to visualize sever status

-   **Docker**: is a set of platform as a service products that use OS-level virtualization to deliver software in packages called container, project used grafana,prometheus and exporter image (main focus)
-   **locust**: An open source load testing tool.

## Architecture of grafana and prometheus explained

-   observer effect: is the disturbance of an observed system by the act of observation.
-   in the right hand architecture, we have a lot of observer effect, it means our targe sever will periodically pushes server state to a time series data base, which leads to use most of our cpu usage to do that.

-   we implement the left hand architecture, with node_exporter we expose server status to other part, so prometheus will scrap those data and saves into a database then our grana will use those data to visulaize.
    ![second approach grafana](/pictures/grafan_prometheus_artchitecure.png)

## what we supposed to do in order to demonstrate this concept?

-   we want to monitor a server to watch realtime data while load testing.
-   for this purpose, we need some dummy data and an application to query on the data.
-   user, article and comment table, each user can have multiple articles and each article can have multiple comments.
-   we want to retrieve all user articles and their corresponding comments.
-   we can solve this problem with two approach:
-   let's see which one is efficient and server state for each approach while load testing.

-   each approach is explained:

1.  firs approach:

    -   one query executed to get all articles of user:

        > `` const articles = (await this.connection.query(`SELECT * FROM articles WHERE author_id=${ userId };`)).rows as Article[];``

    -   second query executed to get a post comment
        > ``const comments = (await this.connection.query(`SELECT * FROM comments WHERE article_id=${ articles[ 0 ].id }`)).rows as Comment[];``
    -   for getting comments for all articles, we need a for loop to execute second query for multiple times.

![first approach](/pictures/firstApproach.png)

2. second approach

    - one query executed to get all articles of user:

        > `` const articles = (await this.connection.query(`SELECT * FROM articles WHERE author_id=${ userId };`)).rows as Article[];``

    - second query executed to get all comments IN post ids (array of post ids)

        > `` const comments = (await this.connection.query(`SELECT * FROM comments WHERE article_id IN ${query}`)).rows as Comment[];``

    - a method call to match comments to their article

![second approach](/pictures/secondApproach.png)

## how to run

1.  make sure you have installed docker
2.  > $ git clone https://github.com/khalvai/lowConsumption.git
3.  > $ cd lowConsumption/project
4.  > $ docker compose build
5.  > $ docker compose up -d

-   after running successful you can request to http://localhost:4000/firstApproach/3 to get all articles and comments of user 3. or also test second approach by http://localhost:4000/secondApproach/3.

## load testing

1. first approach load testing and results.

-   locust chart

![first approach locust](/pictures/total_requests_per_second_1714026533.3.png)

-   grafana panel

![first approach grafana](/pictures/grafan_1.png)

2. second approach load testing and results

-   locust chart

![second approach locust](/pictures/total_requests_per_second_2.png)

-   grafana panel

![second approach grafana](/pictures/grafana_2.png)

## results

-   as we can see in locust chart average response time for first approach is approximately 15 s, and average response time for second approach is 5 s.
-   as grafana panel shows cpu usage and memory usage of grafana and prometheus. we have better state in second approach with same load testing condition

## N + 1 problem

-   N+1 queries are a performance problem in which the application makes database queries in a loop, instead of making a single query that returns or modifies all the information at once.

-   second approach solved this problem, instead of making several queries for retrieving comments, executes just one.
