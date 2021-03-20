import mongooseClient from './mongoose-client';

const hotelCollection = require('./hotel');
const mongoose = require('mongoose');

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

//se scr/db/pg-client.js fra d06i-mutations for inspiration