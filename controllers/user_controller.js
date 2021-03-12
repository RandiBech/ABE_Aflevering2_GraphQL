const role = require('../helpers/role');
const userCollection = require('../models/user'); 
const bcrypt = require("bcrypt");
const saltRounds = 10;

//register 
module.exports.register = async function(req, res){
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = await userCollection.create({
            name: req.body.name,
            password: hashedPassword,
            role: role.User,
            email: `${req.body.name}@hotelfour.dk`
        });
        res.send(user);
    } catch (error) {
        res.status(400).json({
            "title": "Unable to create student record",
            "detail": error
        })
    }
}

//login 
const jwt = require('jsonwebtoken');
const { HotelManager } = require('../helpers/role');
module.exports.login = async function(req, res) {
    try {
        const user = await userCollection.findOne({name: req.body.name});
        console.log(user);
        if(user){
            const compareResult = await bcrypt.compare(req.body.password, user.password);
            if(compareResult){
                const token = jwt.sign({
                    name: user.name,
                    email: user.email,
                    role: user.role
                   // exp: parseInt(Date.now() / 1000 ) +60*60//unix time in seconds
                }, 
                    process.env.JWT_SECRET
                );
                res.send({token});
            } else {
                res.status(401).json({
                    message: "wrong username or password"
                })
            }
        } else {
            res.status(401).json({
                message: "wrong username or password"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Unknown server error"
        })
    }
}

// GET all users 
module.exports.getAllUsers = async function (req, res, next ) {
    try {
        const users = await userCollection.find({}); 
        if(users){
            res.status(200).json({users})
        } else {
            throw ("Users not found"); 
        }
    } catch (error) {
        res.status(400).json({
            "title": "Unable to read users from the database",
            "detail": error
        })
    }
}; 

// Get specific user from user-id
module.exports.getUser = async function (req, res){
    try{
        const user = await userCollection.findById(req.params.userId); 
        if(user){
            res.status(200).json({
                user
            })
        } else {
            throw ("User not found");
        }
    } catch (err) {
        res.status(400).json({
            "title": "Unable to read user from the database",
            "detail": err
        })
    }; 
}


//UPDATE/PUT upgrade User to hotelMangaer by user-id
module.exports.upgradeUser = async function (req, res){
    let userToUpgrade = await userCollection.findByIdAndUpdate(req.params.id,{
        role: HotelManager
    },{
        new: true
    })
    if(userToUpgrade){
        res.status(200).json({
            userToChange: userToUpgrade
        })
    }else {
        res.status(500).json({
            "title":"Unknown server error"
        })
    };
}