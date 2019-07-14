const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express()

let ForumsData = [
	{id : 1, title: "This the first Title of Forum", desc : "This the first Description from the first forum"},
	{id : 2, title: "This the second Title of Forum", desc : "This the first Description from the second forum"},
	{id : 3, title: "This the Third Title of Forum", desc : "This the first Description from the Third forum"}
];

let schema = buildSchema(`
	type Forum {
		id : ID,
		title : String,
		desc : String
	}
	type Query {
		forum(id : ID!) : Forum,
		forums : [Forum]
	}
`)

let resolvers = {
	forum: (args)=> {
		return ForumsData.find(el => el.id == args.id)
	},
	forums: ()=> ForumsData
}
app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: resolvers,
	graphiql : true // To set GUI For testing
}))

app.listen(4000, ()=> console.log("Running on port 4000..."));