import mongooseClient from "./mongoose-client";
import role from "../helpers/role";
import user from "./user";
const userCollection = require("./user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const hotelCollection = require("./hotel");
const jwt = require("jsonwebtoken");

const mongooseApiWrapper = async () => {
  await mongooseClient();
  return {
    userFromAuthToken: async (authToken) => {
      if(!authToken) {
        return null;
      }
      let userName = '';
      jwt.verify(authToken, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
          throw new Error("Unauthorized");
        }
        console.log('decoded:', decoded);
        userName = decoded.name;
      })
      const user = await userCollection.findOne({name: userName});
        if(!user){
          return null;
        }
        console.log('user found', user);
        return user; 
    },

    queries: {
      //user-queries
      login: async ({ input }) => {
        debugger;
        try {
          const user = await userCollection.findOne({ name: input.name });
          console.log(user);
          if (user) {
            const compareResult = await bcrypt.compare(
              input.password,
              user.password
            );
            if (compareResult) {
              const token = jwt.sign(
                {
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  // exp: parseInt(Date.now() / 1000 ) +60*60//unix time in seconds
                },
                process.env.JWT_SECRET
              );
              return token;
            } else {
              throw new Error("wrong username or password");
            }
          } else {
            throw new Error("wrong username or password");
          }
        } catch (error) {
          throw new Error("Unknown server error");
        }
      },
      //hotel-queries
      getHotelFromId: async (hotelId) => {
        const hotel = await hotelCollection.findById(hotelId);
        if (!hotel) {
          throw new Error("Not able to find hotel");
        }
        return hotel;
      },
      getHotelsWithRooms: async ({currentUser}) => {
        console.log('currentUser in get:', currentUser);
        if(!currentUser){
          throw new Error("Unauthorized");
        }
        try {
          const hotels = await hotelCollection.find({});
          if (hotels) {
            const promise = await Promise.all(hotels);
            console.log('promise:', promise[0]);
            return promise;
            //return hotels;
          } else throw "Hotels not found";
        } catch (error) {
          status(400).json({
            title: "Uanble to read hotels",
            deatil: error,
          });
        }
      },
      getAvailableRoomsByDate: async () => {
        const hotels = await hotelCollection.find({});
        if (!hotels) {
          return "No hotels";
        }
        let rooms = [];
        hotels.map((hotel) => {
          hotel.rooms.map((room) => {
            room.reservations.map((reservation) => {
              if (!reservation.guestId) {
                rooms.push({ id: hotel.id, name: hotel.name, room });
              }
            });
          });
        });
        return rooms;
      },
    },
    mutators: {
      //--user mutators
      createUser: async ({ input }) => {
        const payload = { errors: [] };
        try {
          const hashedPassword = await bcrypt.hash(input.password, saltRounds);
          const user = await userCollection.create({
            name: input.name,
            password: hashedPassword,
            role: role.User,
            email: `${input.name}@hotelfour.dk`,
          });
          payload.user = user;
        } catch (error) {
          throw new Error("Not able to create a new user", error);
        }
        return payload;
      },
      //--hotel mutators
      createHotel: async ({ input }) => {
        const response = await hotelCollection.create({
          name: input.name,
          managerId: input.managerId,
          rooms: input.rooms,
        });
        if (!response) {
          throw new Error("Not able to create hotel");
        }
        return response;
      },
      createRoomToHotel: async (hotelId, rooms) => {
        const oldHotel = await hotelCollection.findById(hotelId);
        if (!oldHotel) {
          throw new Error("The hotel does not exist");
        }
        const roomsToAdd = rooms;
        let hotelRooms = oldHotel.rooms;
        if (hotelRooms) {
          hotelRooms.push(roomsToAdd);
        } else {
          hotelRooms = roomsToAdd;
        }

        const response = await hotelCollection.findByIdAndUpdate(
          hotelId,
          {
            rooms: hotelRooms,
          },
          { new: true }
        );
        if (!response) {
          throw new Error("Not able to create rooms for hotel");
        }
        return response;
      },
      //   createReservation: async ({ input }, hotelId) => {
      //     const oldHotel = await hotelCollection.findById(hotelId);
      //     if (!oldHotel) {
      //       throw new Error("The hotel does not exist");
      //     }
      //     const reservationsToAdd = input;
      //     let hotelReservations = oldHotel.rooms.reservations;
      //     if (hotelReservations) {
      //       hotelReservations.push(reservationsToAdd);
      //     } else {
      //       hotelReservations = reservationsToAdd;
      //     }
      //     const response = await hotelCollection.create({
      //       guestId: input.guestId,
      //       dateStart: input.dateStart,
      //       dateEnd: input.dateEnd,
      //     });
      //     if (!response) {
      //       throw new Error("Not able to create reservation");
      //     }
      //     return response;
      //   },
    },
  };
};

export default mongooseApiWrapper;
