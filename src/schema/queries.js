import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    printSchema,
  } from 'graphql';
import {HotelType, ReservationType, RoomType} from './types/hotel-type';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAvailableRooms: { // Alex
         //lav args til input type med de specifikke args heri. lægges under schema/types
        //Return method defineres i db/mongoose-api.js
    },
    getHotelsWithRooms: { // Mads
         //lav args til input type med de specifikke args heri. lægges under schema/types
        //Return method defineres i db/mongoose-api.js
    },
    getHotelFromId: { // Mads
         //lav args til input type med de specifikke args heri. lægges under schema/types
        //Return method defineres i db/mongoose-api.js
    }
  }
})

export default QueryType;