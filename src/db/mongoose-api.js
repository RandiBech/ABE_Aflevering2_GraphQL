const hotelCollection = require('./hotel');


const mongooseApiWrapper = async() =>{
    return {
        //queries
        queries: {
            getHotelFromId: async (hotelIds) => {
                const response = await hotelCollection.findById(hotelIds)
                return response; 
            }
        },
        mutators: {
            createHotel: async ({input}) => {
                const response = await hotelCollection.create({
                    _id: input.id, //skal vi have id med?
                    name: input.name,
                    managerId: input.managerId,
                    rooms: input.rooms
                });
                return response;
            }
        }
    }
}

export default mongooseApiWrapper;

//se scr/db/pg-client.js fra d06i-mutations for inspiration