import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList,
} from 'graphql';

import {RoomType} from './hotel-type';

export const HotelInput = new GraphQLInputObjectType({
    name: 'HotelInput',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        managerId: {type: new GraphQLNonNull(GraphQLID)},
        rooms: {type: GraphQLList(RoomType)}
    })
})

export const ReservationInput = new GraphQLInputObjectType({
    name: 'ReservatuinInput',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID)},
        guestId: { type: new GraphQLNonNull(GraphQLID) },
        dateStart: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (source) => source.dateEnd.toISOString()
        },
        dateEnd: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (source) => source.dateEnd.toISOString(),
        }
    })
})

