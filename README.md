# ABE_Aflevering2_GraphQL

Eksempler til GaphiQL:
Create user:

mutation {
    createUser(input: {
        name: "Alex", 
        password: "1234"
    }) {
        user {
            name
            password
            email
        }
    }
}

Login:

query {
    login(
        input: {
            name:"Alex" 
            password:"1234"
        }
    )
}

Create Hotel:

mutation {
    createHotel(input: {
        name: "Demohotellet",
        managerId: "Mads",
        rooms: {
            roomNo: 25
        }
    }) {
        id
        name 
        managerId
        rooms {
        id
        roomNo
        }
    }
}

Create Room:

mutation {
    createRoomToHotel(
        hotelId: "603e02dfcc68d8751453b861",
        input: { 
            roomNo: 30 }
    ) {
        id
        rooms{ id roomNo reservations{guestId}}
    }
}

Get Hotel

query{
    getHotelFromId(id:"603e02dfcc68d8751453b861"){
        id
        name
        managerId
        rooms {
            roomNo
        }
    }
}

Get Rooms

query{
    getHotelsWithRooms{
        id
        managerId
        name
        rooms{
            roomNo
        }
    }
}



query{
    getAvailableRooms10{
        id
        roomNo
        reservations {
            id
        }
    }
}

Request header med token:

{
	"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFuZGkgSGVqIiwiZW1haWwiOiJSYW5kaSBIZWpAaG90ZWxmb3VyLmRrIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2MTY4NDI3MDN9.MJWqm-67mQI7Jg9WMc-llk4bJqBXVi2YNcywTLNeZVU"
}