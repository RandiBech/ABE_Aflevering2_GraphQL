import mongooseClient from './mongoose-client';

const hotelCollection = require('./hotel');

const mongooseApiWrapper = async () => {
    await mongooseClient();
    return {
        //queries
        queries: {
            getHotelFromId: async (hotelId) => {
                const hotel = await hotelCollection.findById(hotelId); 
                return hotel; 
            },
            getHotelsWithRooms: async () => {
                const response = await hotelCollection.find({}); 
                return response; 
            }
        },
        mutators: {
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
                return response;
            },
        }
    }
}

export default mongooseApiWrapper;