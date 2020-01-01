import express from 'express';
import egql from 'express-graphql';
import schema from './schema';
import query from './query';

const app = express();

app.use('/', egql({
    graphiql: true,
    schema: schema,
    rootValue: query
}));

app.listen(5050, () => {
    console.log('Server started at port 5050.');
})
