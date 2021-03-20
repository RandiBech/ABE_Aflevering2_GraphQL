// her skrives alle post og put metoder

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  printSchema,
  GraphQLID,
} from 'graphql';

import {
  HotelType, 
  ReservationType, 
  RoomType
} from './types/hotel-type';

import {
  HotelInput,
  ReservationInput,
  RoomInput
} from './types/input-hotel';

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

    createRoomToHotel: { // Randi
      type: HotelType,
      args: {
        hotelId: {type: new GraphQLNonNull(GraphQLID)},
        input: {type: new GraphQLNonNull(RoomInput)}
       },
       resolve: function (source, args, {mutators}){
         return mutators.createRoomToHotel(args.hotelId, args.input);
       },
        //lav args til input type med de specifikke args heri. lægges under schema/types
        //Return method defineres i db/mongoose-api.js
    },

    createReservation: { // Alex
      type: ReservationType,
      args: { //lav args til input type med de specifikke args heri. lægges under schema/types
        input: { type: new GraphQLNonNull(ReservationInput) }
      },
      resolve: function (source, {input},{mutators}){
        return mutators.createReservation({input});
      },
    }
  }
});

export default MutationType;