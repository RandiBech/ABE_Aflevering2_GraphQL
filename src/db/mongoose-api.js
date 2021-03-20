import mongooseClient from './mongoose-client';

const hotelCollection = require('./hotel');
const mongoose = require('mongoose');

const mongooseApiWrapper = async () => {
    await mongooseClient();
    return {
        //queries
        queries: {
            getHotelFromId: async (hotelIds) => {
                const response = await hotelCollection.findById(hotelIds)
                return response; 
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