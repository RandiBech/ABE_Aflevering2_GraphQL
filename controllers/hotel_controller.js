const hotelCollection = require('../db/hotel');
const userCollection = require('../db/user');
const role = require('../helpers/role');

// GET home page 
module.exports.index = function (req, res) {
    res.render('index', {title: 'Hotels'}); 
}; 

//POST to create Hotel
module.exports.addHotel = async function (req, res, next) {
    const userId = req.params.userId; 
    const user = await userCollection.findById(userId); 

    let hotel = await hotelCollection.create({
        name: req.body.name,
        managerId: user.name,
        rooms: req.body.rooms
    }).catch(reason =>
        res.status(400).json({
            "title": "Unable to create hotel record",
            "detail": reason
        })
    );
    if (hotel) // The hotel was succesfully added to the collection
        res.status(201).json({
            hotel
        })
    else {
        res.status(500).json({
            "title": "Unknown server error"
        })
    };
};

//PUT to create rooms for Hotel-id
module.exports.addRoomToHotel = async function (req, res) {
    const userId = req.params.userId;
    const user = await userCollection.findById(userId);
    try {
        let hotelOld = await hotelCollection.findById(req.params.hotelId);
        if (hotelOld.managerId === user.name) {
            let roomToAdd = req.body;
            let hotelRooms = hotelOld.rooms;
            hotelRooms.push(roomToAdd);
            let hotel = await hotelCollection.findByIdAndUpdate(req.params.hotelId, {
                rooms: hotelRooms
            }, {
                new: true
            })
            if (hotel) // The room was succesfully added to the hotel
                res.status(200).json({
                    hotel
                })
            else {
                res.status(500).json({
                    "title": "Unknown server error"
                })
            };
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }

    } catch (error) {
        res.status(400).json({
            "title": "Unable to add room to hotel",
            "detail": error
        })
    } 
}
// GET List of rooms from Hotel-id 
module.exports.getRoomsFromHotelID = async function (req, res) {
    const user = await userCollection.findById(req.params.userid)
    try {
        const hotel = await hotelCollection.findById(req.params.hotelid)
        if (hotel.managerId === user.name) {
            res.status(200).json({
                hotel
            })
        } else {
            res.status(401).json({
                "title": "Not authorized"
            })
        }
    } catch (err) {
        res.status(400).json({
            "title": "Unable to read rooms from DB",
            "detail": err
        })
    }   
}
// -- list of available rooms from hotel-id - role = User
module.exports.getAvailableRoomsFromHotelid = async function (req, res) {
    const user = await userCollection.findById(req.params.userid)
    try {
        const hotels = await hotelCollection.find({});
        if (hotels) {
            let reservationsAvailable = [];
            hotels.map((hotel) => {
                hotel.rooms.map(room => {
                    room.reservations.map(reservation => {
                        if (!reservation.guestId) {
                            reservationsAvailable.push({ "_id": hotel._id, "name": hotel.name, room });
                        }
                    })
                })
            })
            res.status(200).json({
                reservationsAvailable
            })
        } else {
            throw ("Hotels not found");
        }
    }
    catch (err) {
        res.status(400).json({
            "title": "Unable to read rooms from DB",
            "detail": err
        })
    }
}

//GET all rooms for All Hotels 
// -- role=admin: can see all info about all hotels
// -- role=manager: can see list of hotels which the manger is on
// -- role=guest: list of all my resevations
// -- role=user: no access
module.exports.getHotelsWithRooms = async function (req, res){
    const userId = req.params.userId;
    const user = await userCollection.findById(userId);

    if(user.role === role.Admin){
        try {
            const hotels = await hotelCollection.find({});
            if(hotels){
                res.status(200).json({
                    hotels
                })
            } else {
                throw ("Hotels not found");
            }
        } catch (error) {
            res.status(400).json({
                "title": "Unable to read hotels",
                "detail": error
            })
        }
    } else if(user.role === role.HotelManager){
        try {  
            const hotels = await hotelCollection.find({managerId: user.name});        
            if(hotels){
                res.status(200).json({
                    hotels 
                })
            } else{
                throw ("Hotels not found");
            }
        } catch (error) {
            res.status(400).json({
                "title": "Unable to read hotels",
                "detail": error
            })
        }
    } else{ //role.Guest
        try {          
            const hotels = await hotelCollection.find({});
            if(hotels){
                let hotelsWithReservation = [];
                hotels.map((hotel) => {
                    hotel.rooms.map(room => {
                        room.reservations.map(reservation => {
                            if (reservation.guestId === user.name) {
                                hotelsWithReservation.push({"_id": hotel._id, "name": hotel.name, room});
                            }
                        })
                    })
                })
                res.status(200).json({
                    hotelsWithReservation 
                }) 
            } else {
                throw ("Hotels not found");
            }               
        } catch (error) {
            res.status(400).json({
                "title": "Unable to read hotels",
                "detail": error
            })
        }
    } 
}