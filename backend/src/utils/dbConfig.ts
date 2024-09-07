import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: String(process.env.DB_USER),
  host: String(process.env.DB_HOST),
  database: String(process.env.DB_NAME),
  password: String(process.env.DB_PASSWORD),
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
export default pool;
