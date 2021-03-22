import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  printSchema,
  GraphQLID,
} from 'graphql';
import { UnsupportedMediaType } from 'http-errors';

import {
  HotelType, 
  ReservationType, 
  UserType
} from './types/hotel-type';

import {
  HotelInput,
  ReservationInput,
  RoomInput,
} from './types/input-hotel';

import {UserInput} from './types/input-user';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //--user mutations
    createUser:{
      tyep: UserType,
      args:{
        input: {type: new GraphQLNonNull(UserInput)}
      },
      resolve: function (source, {input}){
        return
      }
    },
    //--hotel mutations
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
    },
    createReservation: { // Alex
      type: ReservationType,
      args: { 
        input: { type: new GraphQLNonNull(ReservationInput) }
      },
      resolve: function (source, {input},{mutators}){
        return mutators.createReservation({input});
      },
    }
  }
});

export default MutationType;