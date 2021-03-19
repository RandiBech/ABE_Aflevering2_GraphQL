// her skrives alle post og put metoder

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    printSchema,
  } from 'graphql';
import {HotelType, ReservationType, RoomType} from './types/hotel-type';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createHotel: { // Randi
      type: HotelType,
      args: { //lav args til input type med de specifikke args heri. lægges under schema/types
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        managerId: {type: new GraphQLNonNull(GraphQLID)},
        rooms: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoomType)))}
      },
      resolve: function (source, {id, name, managerId, rooms}){
        //Return method defineres i db/mongoose-api.js
      }
    },
    createRoomToHotel: { // Randi
        //lav args til input type med de specifikke args heri. lægges under schema/types
        //Return method defineres i db/mongoose-api.js
    },
    createReservation: { // Alex
      type: ReservationType,
      args: { //lav args til input type med de specifikke args heri. lægges under schema/types
        id: {type: new GraphQLNonNull(GraphQLID)},
        guestId: { type: new GraphQLNonNull(GraphQLID) },
        dateStart: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (source) => source.dateStart.toISOString(),
        },
        dateEnd: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (source) => source.dateEnd.toISOString(),
        }
      },
      resolve: function (source, {id, guestId, dateStart, dateEnd}){
        //Return method defineres i db/mongoose-api.js
      },
    }
  }
})