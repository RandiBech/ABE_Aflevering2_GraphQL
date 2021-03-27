import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from "graphql";
import { HotelType, RoomType } from "./types/hotel-type";
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
      type: new GraphQLList(new GraphQLNonNull(RoomType)),
      resolve: async (source, args, { loaders }) => {
        return loaders.getAvailableRoomsByDate();
      },
    },
    getHotelsWithRooms: {
      type: new GraphQLList(new GraphQLNonNull(HotelType)),
      resolve: async (source, args, { loaders }, { currentUser }) => {
        return loaders.getHotelsWithRooms.load({ currentUser });
      },
    },
    getHotelFromId: {
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
