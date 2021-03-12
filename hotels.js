

module.exports = hotels = [
    {
        name: 'HotelTest1',
        managerId: 'test1',
        rooms: [{
            roomNo: 1,
            reservations: [
                {
                    dateStart: new Date(),
                    dataEnd: new Date(),
                }
            ],
        }]
    },
    {
        name: 'SeastoneHotel',
        managerId: 'Trang',
        rooms: [{
            roomNo: 1,
            reservations: [
                {
                    guestId: "mads",
                    dateStart: new Date(),
                    dataEnd: new Date(),
                }
            ],
        },
        {
            roomNo: 2,
            reservations: [
                {
                    guestId: "Randi",
                    dateStart: new Date(),
                    dataEnd: new Date(),
                }
            ]
        },
        {
            roomNo: 3,
            reservations: [
                {
                    guestId: "Alex",
                    dateStart: new Date(),
                    dataEnd: new Date(),
                }
            ]
        }]
    },
    {
        name: 'SuiteLifeHotel',
        managerId: 'Alex',
        rooms: [
        {
            roomNo: 1,
            reservations: [
                {
                    guestId: "Randi",
                    dateStart: new Date(),
                    dataEnd: new Date(),
                }
            ],
        },
        {
            roomNo: 2,
            reservations: [
                {
                    guestId: "Mads",
                    dateStart: new Date(),
                    dataEnd: new Date(),
                }
            ],
        }]   
    },
]
