import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  printSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";
import { HotelType, ReservationType, RoomType } from "./types/hotel-type";
import UserInput from "./types/input-user";

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    login: {
      type: GraphQLString,
      args: {
        input: { type: new GraphQLNonNull(UserInput) },
      },
      resolve: async (soruce, { input }, { loaders }) => {
        debugger;
        return loaders.login({ input });
      },
    },
    getAvailableRooms: {
      // Alex
      type: new GraphQLList(new GraphQLNonNull(RoomType)),
      resolve: async (source, args, { loaders }) => {
        return loaders.getAvailableRoomsByDate();
      },
    },
    getHotelsWithRooms: {
      // Mads

      type: new GraphQLList(new GraphQLNonNull(HotelType)),
      resolve: async (source, args, { loaders }) => {
        return loaders.getHotelsWithRooms({});
      },
    },
    getHotelFromId: {
      // Mads
      type: HotelType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: function (source, args, { loaders }) {
        return loaders.getHotelFromId(args.id);
      },
    },
  },
});

export default QueryType;
