import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export default UserInput;