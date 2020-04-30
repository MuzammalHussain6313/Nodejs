const roomsController = {};
const Rooms = require('../models/rooms.model');
const jsonwebtoken =  require('jsonwebtoken');
roomsController.addroom = async (req, res) => {
    try {
      const body = req.body;
      const r = body.Rooms;
         //console.log(req.body);
         for (var i = 0; i < r.length; i++)
      {
         const chk = body.Rooms[i].roomno.Roomid;
           console.log(chk);
        const room = await Rooms.find({ Rooms: { $elemMatch: { 'roomno.Roomid': chk } } } )
      console.log(room);
      if(room.length)
      {
         console.log("lil");
      }
      }
      
      
    //const result = await room.save();
      res.status(200).send({
        code: 200,
        result,
        message: 'Rooms Booked Successfully',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = roomsController;