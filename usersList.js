const {Admin, User, Guest, HotelManager} = require('./helpers/role')

module.exports = users = [{
    name: 'Randi',
    role: Admin 
},
{
    name: 'Mads',
    role: Guest
},
{
    name: 'Trang',
    role: HotelManager
},
{
    name: 'Alex',
    role: HotelManager
},
{
    name: 'Henrik',
    role: User
}
]