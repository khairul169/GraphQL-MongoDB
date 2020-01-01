import express from 'express';
import egql from 'express-graphql';
import {buildSchema} from 'graphql';

const app = express();

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const query = {
    hello: () => 'Hello world!'
}

app.use('/', egql({
    graphiql: true,
    schema,
    rootValue: query
}));

app.listen(5050, () => {
    console.log('Server started at port 5050.');
})
