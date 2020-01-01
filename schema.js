import {buildSchema} from 'graphql';

const schema = `
    type Item {
        id: ID!,
        name: String,
        amount: Int
    }

    input ItemInput {
        name: String,
        amount: Int
    }

    type Query {
        items: [Item],
        item(id: ID!): Item
    }

    type Mutation {
        createItem(input: ItemInput!): Item,
        setItem(id: ID!, input: ItemInput!): Item,
        deleteItem(id: ID!): Item
    }
`;

export default buildSchema(schema);
