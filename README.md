# ABE_Aflevering2_GraphQL

Eksempler til GaphiQL:

mutation {
  createHotel(input: {name: "", managerId: "Mads", rooms: {roomNo: 25}}) {
    id
    name
    managerId
    rooms {
      id
      roomNo
    }
  }
}

mutation {
  createRoomToHotel(hotelId: "60560a9010d22b3080b94896", input: {roomNo: 30}) {
    id
    rooms{id roomNo reservations{guestId}}
  }
}

query{
    getHotelFromId(id:"603e02dfcc68d8751453b861")
  {
    id
    name
    managerId
    rooms{
      roomNo
      }
  }
}

getHotelsWithRooms{
    id
    managerId
    name
    rooms{
      roomNo
    }
  }
}