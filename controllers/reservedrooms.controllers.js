const roomController = {};
const Reservedroom = require('../models/reservedrooms.model');
const jsonwebtoken =  require('jsonwebtoken');
roomController.bookroom = async (req, res) => {
    try {
      let result;
      const body = req.body;
      console.log(body);
    //   this.match = false;
    //  // console.log(body.checkin);
  
    //   const r = body.Room; 
    //   console.log(r);
    //      for (var i = 0; i < r.length; i++)
    //   {
    //     console.log(r.length);
    //      let Rmid = body.Room[i].Rooms[i].roomno.Roomid;
    //      console.log(Rmid);
    //     let date = body.checkin;
    //     // const dte = await  Reservedroom.find({ "body.checkin":{ $lt: date }})

    //     const rmid = await  Reservedroom.find({ "Room.Rooms.roomno.Roomid": Rmid})
    //        console.log(rmid);
    //     if(rmid.length)
    //       {
    //          console.log(" roomId match");
    //       }
    //       else
    //       {
    //         console.log("giniv");
    //         this. match = true;
    //       }
      
    
  
    // console.log(this.match);
    // if(this.match === true)
    // {
    //    const body = req.body;
    //       const reservedroom = new Reservedroom (body);
    //      result = await reservedroom.save();
    // }
    // if(this.match === true)
    // {
    //   res.status(200).send({
    //     code: 200,
    //     message: 'Rooms Booked Successfully',
    //   });
    // }
  
    } catch (error) {
      console.log('error', error);
      console.log("fuck off");
      return res.status(500).send(
        error
        );
    }
  };
  module.exports = roomController;