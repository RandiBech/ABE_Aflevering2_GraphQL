var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {title: 'Express'}); 
}); 

module.exports = router;


/* Post Add hotel */
// router.route('/addHotel')
//   .post(hotelController.addHotel); 

/* POST add hotel room */
// router.route('/:hotelid')
//   //.get(hotelController.getHotel)
//   .post(hotelController.addRoomToHotel)
