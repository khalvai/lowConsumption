import { migrate } from 'postgres-migrations';
import { join } from 'path';
import { readdirSync, existsSync } from 'fs';

export const migration = async function (): Promise<unknown>
{
    const dbConfig = {
        database: "PresentationDB",
        user: "postgresUser",
        password: "postgresPass",
        host: "db",
        port: 5432,
        ensureDatabaseExists: true,
        defaultDatabase: 'postgres',
    };

    const sqlFilePath = join(__dirname, '..', "..", 'data');

    console.log(sqlFilePath);

    if (!existsSync(sqlFilePath))
    {
        console.log(`SQL file not found!`);
    }


    const dir = readdirSync(sqlFilePath);

    console.log(dir);

    return await migrate(dbConfig, sqlFilePath);
};

