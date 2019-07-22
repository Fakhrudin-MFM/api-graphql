const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express()

let ForumsData = [
	{
		id : 1,
		title: "This the first Title of Forum",
		desc : "This the first Description from the first forum",
		userId: "1"
	},
	{
		id : 2,
		title: "This the second Title of Forum",
		desc : "This the first Description from the second forum",
		userId: "2"
	},
	{
		id : 3,
		title: "This the Third Title of Forum",
		desc : "This the first Description from the Third forum",
		userId: "2"
	}
];

let userData = [
	{ id : "1", name: "Millea"},
	{ id : "2", name: "Duski"},
	{ id : "3", name: "Laguna"}
]
let schema = buildSchema(`
	type Forum {
		id : ID,
		title : String,
		desc : String,
		user:User
	}

	type User {
		id : ID,
		name : String,
		forums : [Forum]
	}

	type Query {
		forum(id : ID!) : Forum,
		forums : [Forum],
		user(id :ID!) : User,
		users: [User]
	}
`)

let resolvers = {
	forum: (args)=> {
		let _forum = ForumsData.find(el => el.id == args.id)
		let _user = userData.find(el => el.id == _forum.id)

		_forum['user'] = _user
		return _forum
	},
	forums: ()=> ForumsData,
	user: (args) => {
		let _user = userData.find(el => el.id == args.id)
		let _forums = ForumsData.filter(el => el.userId == _user.id)

		_user['forums'] = _forums
		return _user
	},
	users:()=> userData // Just return user data
}
app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: resolvers,
	graphiql : true // To set GUI For testing
}))

app.listen(4000, ()=> console.log("Running on port 4000..."));