import { migrate } from 'postgres-migrations';

export const migration = async function (): Promise<unknown>
{
    const dbConfig = {
        database: "PresentationDB",
        user: "postgresUser",
        password: "postgresPass",
        host: "localhost",
        port: 5432,
        ensureDatabaseExists: true,
        defaultDatabase: 'postgres',
    };



    return await migrate(dbConfig, process.cwd() + '/src/migrations');
};
export const down = async function (): Promise<unknown>
{
    const dbConfig = {
        database: "PresentationDB",
        user: "postgresUser",
        password: "postgresPass",
        host: "localhost",
        port: 5432,
        ensureDatabaseExists: true,
        defaultDatabase: 'postgres',
    };



    return await migrate(dbConfig, process.cwd() + '/src/migrations');
};