import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/api';

dotenv.config();

const app: Express = express();
var corsOptions = {
    origin: process.env.ORIGIN
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);

const MongoURL = `${process.env.DATABASE_URL}`;
const port = process.env.PORT;

mongoose.connect(MongoURL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
    process.exit(1);
})

database.once('connected', () => {
    console.log('Database Connected');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at port ${port}`);
    });
})

