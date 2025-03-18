import { DataSource } from "typeorm";
import { User } from "../entities/User";
import {Transaction} from '../entities/Transaction'
import { Category } from "../entities/Category";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [User, Transaction, Category],
    migrations: ["src/migrations/*.ts"]
  });

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => console.log("Database connection error:", error));
