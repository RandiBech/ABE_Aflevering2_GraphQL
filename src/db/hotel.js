const mongoose = require('mongoose'); 

const hotelSchema = new mongoose.Schema({
    name: String,
    managerId: String,
    rooms: [{
        roomNo: Number,
        reservations: [
            {
                guestId: String,
                dateStart: Date,
                dateEnd: Date
            }
        ],
    }]
})

const Hotel = mongoose.model('Hotel',hotelSchema); 
module.exports = Hotel; 