// backend/src/config/database.ts
import "reflect-metadata"; // Required for TypeORM decorators
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Software } from "../entity/Software";
import { Request } from "../entity/Request";
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password", // Ensure this matches your .env
    database: process.env.DB_NAME || "user_access_db",
    synchronize: true, // Auto-create schema - use migrations in production!
    logging: false, // Set to 'all' for detailed SQL logs
    entities: [User, Software, Request],
    migrations: [],
    subscribers: [],
});