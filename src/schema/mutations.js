// her skrives alle post og put metoder

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

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createHotel: { // Randi
      type: HotelType,
      args: {
       input: {type: new GraphQLNonNull(HotelInput)}
      },
      resolve: function (source, {input}, {mutators}){
        return mutators.createHotel({input});
      },
    },
    // createRoomToHotel: { // Randi
    //   type: HotelType,
    //     //lav args til input type med de specifikke args heri. lægges under schema/types
    //     //Return method defineres i db/mongoose-api.js
    // },
    // createReservation: { // Alex
    //   type: ReservationType,
    //   args: { //lav args til input type med de specifikke args heri. lægges under schema/types
    //     id: {type: new GraphQLNonNull(GraphQLID)},
    //     guestId: { type: new GraphQLNonNull(GraphQLID) },
    //     dateStart: {
    //         type: new GraphQLNonNull(GraphQLString),
    //         resolve: (source) => source.dateStart.toISOString(),
    //     },
    //     dateEnd: {
    //         type: new GraphQLNonNull(GraphQLString),
    //         resolve: (source) => source.dateEnd.toISOString(),
    //     }
    //   },
    //   resolve: function (source, {id, guestId, dateStart, dateEnd}){
    //     //Return method defineres i db/mongoose-api.js
    //   },
    // }
  }
});

export default MutationType;