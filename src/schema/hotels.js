// QueryType med fields. Fields med metoder indeholdende type, 
// args og resolver (resolver kalder ny metode fra utils med logikken)

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    printSchema,
  } from 'graphql';
import {HotelType, ReservationType, RoomType} from './types/hotel-type';

const QueryType = new GraphQLObjectType({
  name: 'QueryHotel',
  fields: {
    createHotel: { // Randi
      type: HotelType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        managerId: {type: new GraphQLNonNull(GraphQLID)},
        rooms: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoomType)))}
      },
      resolve: function (source, {id, name, managerId, rooms}){
        //return method from utils
      }
    },
    createRoomToHotel: { // Randi

    },
    createReservation: { // Alex
      type: ReservationType,
      args: {
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
        //Return method from utils
      },
    },
    getAvailableRooms: { // Alex

    },
    getHotelsWithRooms: { // Mads

    },
    getHotelFromId: { // Mads

    }
  }
})