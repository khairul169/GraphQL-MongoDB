import {buildSchema} from 'graphql';

const schema = `
    type Item {
        id: ID!,
        name: String,
        amount: Int
    }

    input ItemInput {
        name: String!,
        amount: Int
    }

    type Query {
        items: [Item],
        item(id: ID!): Item
    }

    type Mutation {
        addItem(input: ItemInput!): Item
    }
`;

export default buildSchema(schema);
