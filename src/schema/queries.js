//import { load } from 'dotenv/types';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    printSchema,
    GraphQLID,
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
          return loaders.getAvailableRoomsByDate();
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
    getHotelsWithRooms: { // Mads
         //lav args til input type med de specifikke args heri. lægges under schema/types
        //Return method defineres i db/mongoose-api.js
        type: new GraphQLList(new GraphQLNonNull(HotelType)),
        resolve: async (source, args, {loaders}) => {
          return loaders.getHotelsWithRooms({});
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
    // getAvailableRooms: { // Alex
    //      //lav args til input type med de specifikke args heri. lægges under schema/types
    //     //Return method defineres i db/mongoose-api.js
    // },
  }
})

export default QueryType;