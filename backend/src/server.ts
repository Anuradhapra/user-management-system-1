// backend/src/server.ts
import { AppDataSource } from './config/database';
import app from './app';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(Server is running on port ${PORT});
    });
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});