import mongooseClient from './mongoose-client';

const hotelCollection = require('./hotel');

const mongooseApiWrapper = async () => {
    await mongooseClient();
    return {
        //queries
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
            }
        }
    }
}

export default mongooseApiWrapper;

//se scr/db/pg-client.js fra d06i-mutations for inspiration