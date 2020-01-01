import express from 'express';
import egql from 'express-graphql';
import {buildSchema} from 'graphql';

const app = express();

const schema = buildSchema(`
    type Query {
        hello: String,
        items: [Item]
    }

    type Item {
        id: Int!,
        name: String
    }
`);

const items = [
    {
        id: 1,
        name: 'Item A'
    },
    {
        id: 2,
        name: 'Item B'
    },
    {
        id: 3,
        name: 'Item C'
    },
    {
        id: 4,
        name: 'Item D'
    },
    {
        id: 5,
        name: 'Item E'
    },
];

const query = {
    hello: () => 'Hello world!',
    items: () => items
}

app.use('/', egql({
    graphiql: true,
    schema,
    rootValue: query
}));

app.listen(5050, () => {
    console.log('Server started at port 5050.');
})
