import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    printSchema,
    GraphQLList,
  } from 'graphql';
import {
  HotelType, 
  ReservationType, 
  RoomType
} from './types/hotel-type';

const stringType = new GraphQLObjectType({
  name: 'mm',
  description: 'Reservation in Room',
    fields: {
        name: { type: GraphQLString },
    }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAvailableRooms: { // Alex
      type: new GraphQLList(new GraphQLNonNull(RoomType)),
        resolve: async (source, args, { loaders }) => {
          //return loaders.roomsByDate.load('latest');
        },
    },
    getHotel: { // Randi
      type: stringType,
      args: {
       input: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, {input}, {mutators}){
        return 'Hotelcreted';
      },
    },
    // getAvailableRooms: { // Alex
    //      //lav args til input type med de specifikke args heri. lægges under schema/types
    //     //Return method defineres i db/mongoose-api.js
    // },
    // getHotelsWithRooms: { // Mads
    //      //lav args til input type med de specifikke args heri. lægges under schema/types
    //     //Return method defineres i db/mongoose-api.js
    // },
    // getHotelFromId: { // Mads
    //      //lav args til input type med de specifikke args heri. lægges under schema/types
    //     //Return method defineres i db/mongoose-api.js
    // }
  }
})

export default QueryType;