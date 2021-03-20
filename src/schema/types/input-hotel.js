import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

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
        roomNo: { type: new GraphQLNonNull(GraphQLInt) },
        reservations: { type: GraphQLList(ReservationInput) }
    })
})

export default HotelInput