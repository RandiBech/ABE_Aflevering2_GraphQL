import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users of hotel',
    fields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
        role: {type: new GraphQLNonNull(GraphQLString)}
    }
})