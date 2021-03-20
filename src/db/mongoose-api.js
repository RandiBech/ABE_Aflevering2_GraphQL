const hotelCollection = require('./hotel');


const mongooseApiWrapper = async() =>{
    return {
        //queries
        mutators: {
            createHotel: async ({input}) => {
                const response = await hotelCollection.create({
                    _id: input.id, //skal vi have id med?
                    name: input.name,
                    managerId: input.managerId,
                    rooms: input.rooms
                });
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