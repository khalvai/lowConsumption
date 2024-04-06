import { Pool, PoolClient } from 'pg';

export class PostgresqlUnitOfWork
{
    private static pool: Pool;
    private static connection: PoolClient | null = null;

    public constructor ()
    {
        if (!!PostgresqlUnitOfWork.pool)
        {
            throw new Error('Connection already exists');
        }
        PostgresqlUnitOfWork.pool = new Pool({
            database: "PresentationDB",
            user: "postgresUser",
            password: "postgresPass",
            host: "db",
            port: 5432,
        });
    }

    public async getConnection(): Promise<PoolClient>
    {
        if (PostgresqlUnitOfWork.connection)
        {
            return PostgresqlUnitOfWork.connection;
        }
        PostgresqlUnitOfWork.connection =
            await PostgresqlUnitOfWork.pool.connect();

        return PostgresqlUnitOfWork.connection;
    }
}

