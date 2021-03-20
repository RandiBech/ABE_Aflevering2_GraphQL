import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLID,
} from 'graphql';


export const ReservationType = new GraphQLObjectType({
    name: 'Reservation',
    description: 'Reservation in Room',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        guestId: { type: new GraphQLNonNull(GraphQLID) },
        dateStart: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (source) => source.dateStart.toISOString(),
        },
        dateEnd: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (source) => source.dateEnd.toISOString(),
        }
    }
})

export const RoomType = new GraphQLObjectType({
    name: 'Room',
    description: 'Room in hotel',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        roomNo: {type: new GraphQLNonNull(GraphQLInt)},
        reservations: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ReservationType)))}
    }
})

export const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    description: 'Hotel schema',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        managerId: {type: new GraphQLNonNull(GraphQLID)},
        rooms: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoomType)))}
    }
})