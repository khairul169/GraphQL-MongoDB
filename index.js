import express from 'express';
import egql from 'express-graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import schema from './schema';
import query from './query';

// Setup dot environment
dotenv.config();

// Connect to database server
const dbServer = process.env.DB_SERVER;
mongoose.connect(dbServer, {useUnifiedTopology: true, useNewUrlParser: true})
    .catch(error => console.log(error));

// Database connection handler
mongoose.connection.on('connected', () => console.log('db connected'));
mongoose.connection.on('error', error => console.log('db error: ', error));

// Configure mongoose
mongoose.set('useFindAndModify', false);

// Configure express http server
const app = express();

app.use('/', egql({
    graphiql: true,
    schema: schema,
    rootValue: query
}));

app.listen(5050, () => {
    console.log('Server started at port 5050.');
})
