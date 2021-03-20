//import { load } from 'dotenv/types';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    printSchema,
    GraphQLID,
  } from 'graphql';
import {HotelType, ReservationType, RoomType} from './types/hotel-type';
import HotelInput from './types/input-hotel';

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
        type: HotelType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve: function (source, args, {loaders}){
          return loaders.getHotelsWithRooms(args.id);
        },
    },
    getHotelFromId: { // Mads
         //lav args til input type med de specifikke args heri. lægges under schema/types
        //Return method defineres i db/mongoose-api.js
        type: HotelType, 
        args: {
          id: { type: new GraphQLNonNull(GraphQLID)},
        },
        resolve: function (source, args, {loaders}){
          return loaders.getHotelFromId(args.id); 
        },
    },
  }
})

export default QueryType;