import express from 'express';
import egql from 'express-graphql';
import {buildSchema} from 'graphql';

const app = express();

const schema = buildSchema(`
    type Item {
        id: Int!,
        name: String,
        test: String
    }

    input ItemInput {
        name: String!
    }

    type Query {
        hello: String,
        items: [Item]
    }

    type Mutation {
        addItem(input: ItemInput!): Item
    }
`);

class ItemType {
    constructor(id, name = '') {
        this.id = id;
        this.name = name;
    }

    test() {
        return this.id + ' - ' + this.name;
    }
}

const items = [];

// Populate default items
items.push(new ItemType(1, 'Stone'));
items.push(new ItemType(2, 'Wood'));
items.push(new ItemType(3, 'Metal'));

const query = {
    hello: () => 'Hello world!',
    items: () => items,
    addItem: ({input}) => {
        const item = new ItemType(items.length + 1, input.name);
        items.push(item);
        return item;
    }
}

app.use('/', egql({
    graphiql: true,
    schema,
    rootValue: query
}));

app.listen(5050, () => {
    console.log('Server started at port 5050.');
})
