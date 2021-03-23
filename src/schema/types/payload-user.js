import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';
import UserType from './user-type';
import UserError from './user-error';

const UserPayload = new GraphQLObjectType({
    name: 'UserPayload',
    fields: () => ({
        errors: {
            type: new GraphQLNonNull(
                new GraphQLList(new GraphQLNonNull(UserError)),
            ),
        },
        user: { type: UserType },
    }),
});

export default UserPayload;