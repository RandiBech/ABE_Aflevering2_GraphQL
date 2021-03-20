import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import {RoomType} from './hotel-type';

export const HotelInput = new GraphQLInputObjectType({
    name: 'HotelInput',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        managerId: {type: new GraphQLNonNull(GraphQLID)},
        rooms: {type: GraphQLList(RoomInput)}
    })
})

export const ReservationInput = new GraphQLInputObjectType({
    name: 'ReservatuinInput',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID)},
        guestId: { type: new GraphQLNonNull(GraphQLID) },
        dateStart: {
            type: new GraphQLNonNull(GraphQLString)
        },
        dateEnd: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
})

export const RoomInput = new GraphQLInputObjectType({
    name: 'RoomInput',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        roomNo: { type: new GraphQLNonNull(GraphQLInt) },
        reservations: { type: GraphQLList(ReservationInput) }
    })
})

export default HotelInput