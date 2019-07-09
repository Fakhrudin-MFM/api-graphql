const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express()

app.use('/graphql', graphqlHTTP({
	graphiql : true // To set GUI For testing
}))

app.listen(4000, ()=> console.log("Running on port 4000..."));