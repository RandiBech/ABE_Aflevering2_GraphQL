import mongooseClient from './mongoose-client';
import {roles} from 'scr/helpers/role';
const hotelCollection = require('./hotel');


const mongooseApiWrapper = async () => {
    await mongooseClient();
    return {
        queries: {
            getHotelFromId: async (hotelId) => {
                const hotel = await hotelCollection.findById(hotelId); 
                if (!hotel) {
                    throw new Error('Not able to find hotel');
                }
                return hotel; 
            },
            getHotelsWithRooms: async () => {
                try{
                    const hotels = await hotelCollection.find({});
                    if(hotels){
                        return hotels;
                    } 
                    else
                        throw ("Hotels not found")
                } catch (error) {
                    status(400).json({
                        "title": "Uanble to read hotels",
                        "deatil": error
                    })
                }
            },
            getAvailableRoomsByDate: async () => {
                const hotels = await hotelCollection.find({})
                if (!hotels) {
                    return 'No hotels'
                }
                let rooms = []
                hotels.map((hotel) => {
                    hotel.rooms.map(room => {
                        room.reservations.map(reservation => {
                            if (!reservation.guestId) {
                                rooms.push({ "id": hotel.id, "name": hotel.name, room });
                            }
                        })
                    })
                })
                return rooms
            }
        },
        mutators: {
            creaeUser: async ({input}) => {
                try {
                    const hashedPassword = await bcrypt.hash(input.password, saltRounds);
                    const user = await userCollection.create({
                        name: input.name,
                        password: hashedPassword,
                        role: roles.User,
                        email: `${input.name}@hotelfour.dk`
                    });
                    res.send(user);
                } catch (error) {
                    res.status(400).json({
                        "title": "Unable to create student record",
                        "detail": error
                    })
                }
            },
            //--hotel mutators
            createHotel: async ({ input }) => {
                const response = await hotelCollection.create({
                    name: input.name,
                    managerId: input.managerId,
                    rooms: input.rooms
                });
                if (!response) {
                    throw new Error('Not able to create hotel');
                }
                return response;
            },
            createRoomToHotel: async (hotelId, rooms) => {
                const oldHotel = await hotelCollection.findById(hotelId);
                if(!oldHotel) {
                    throw new Error('The hotel does not exist');
                }
                const roomsToAdd = rooms;
                let hotelRooms = oldHotel.rooms;
                if(hotelRooms){
                    hotelRooms.push(roomsToAdd);
                } else{
                    hotelRooms = roomsToAdd;
                }
                
                const response = await hotelCollection.findByIdAndUpdate(hotelId, {
                    rooms: hotelRooms
                }, {new: true});
                if (!response) {
                    throw new Error('Not able to create rooms for hotel');
                }
                return response;
            },
            createReservation: async ({input}) => {
                const response = await hotelCollection.create({
                    guestId: input.guestId,
                    dateStart: input.dateStart,
                    dateEnd: input.dateEnd
                });
                if (!response) {
                    throw new Error('Not able to create reservation');
                }
                return response;
            },
        }
    }
}

export default mongooseApiWrapper;