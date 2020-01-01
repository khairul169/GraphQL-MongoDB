import {buildSchema} from 'graphql';

const schema = `
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
`;

export default buildSchema(schema);
