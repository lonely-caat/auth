import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

class DbPool {
    constructor() {
        if (!DbPool.instance) {
            const user = process.env.DB_USER;
            const host = process.env.DB_HOST;
            const database = process.env.DB_NAME;

            this.pool = new Pool({ user, host, database });
            DbPool.instance = this;
        }

        return DbPool.instance;
    }

    getPool() {
        return this.pool;
    }

    async addUser(username, hashedPassword) {
        try {
            const res = await this.pool.query(
                'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *',
                [username, hashedPassword]
            );
            return res.rows[0];
        } catch (error) {
            if (error.code === '23505') { // PostgreSQL error code for unique violation
                throw new Error('DuplicateUsername');
            }
            throw error;
        }
    }
}

const dbPoolInstance = new DbPool();
Object.freeze(dbPoolInstance);

export default dbPoolInstance;
