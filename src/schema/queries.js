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
    getHotel: { // Randi
      type: stringType,
      args: {
       input: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, {input}, {mutators}){
        return 'Hotelcreted';
      },
    },
<<<<<<< HEAD
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
=======
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
>>>>>>> 36ae1e285ef8a75dd14a50c8fb6a754ffb44a96c
  }
})

export default QueryType;