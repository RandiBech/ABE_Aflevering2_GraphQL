import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList,
} from 'graphql';

import {RoomType} from './hotel-type';

const HotelInput = new GraphQLInputObjectType({
    name: 'HotelInput',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        managerId: {type: new GraphQLNonNull(GraphQLID)},
        rooms: {type: GraphQLList(RoomType)}
    })
})

export default HotelInput;