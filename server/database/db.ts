import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
    url: process.NODE_ENV === 'production' ? process.env.TURSO_DATABASE_URL! : 'file:local.db',
    authToken: process.NODE_ENV === 'production' ? process.env.TURSO_AUTH_TOKEN : undefined,
});

export const db = drizzle(client);