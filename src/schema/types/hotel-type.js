import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLNumber,
} from 'graphql';

const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    description: 'Hotel schema',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLNumber)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        managerId: {type: new GraphQLNonNull(GraphQLString)},
        rooms: {type: new GraphQLList(RoomType)}
    }
})

const RoomType = new GraphQLObjectType({
    name: 'Rooms',
    description: 'Rooms in hotel',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLNumber)},
        roomNo: {type: new GraphQLNonNull(GraphQLNumber)},
    }
})