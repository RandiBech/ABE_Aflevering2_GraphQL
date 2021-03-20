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

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAvailableRooms: { // Alex
      type: new GraphQLList(new GraphQLNonNull(RoomType)),
        resolve: async (source, args, { loaders }) => {
          //return loaders.roomsByDate.load('latest');
        },
    },
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