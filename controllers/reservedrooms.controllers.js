const roomController = {};
const Reservedroom = require('../models/reservedrooms.model');
const jsonwebtoken =  require('jsonwebtoken');
roomController.bookroom = async (req, res) => {
    try {
      let result;
      const body = req.body;
      if(body.active === false)
      {
        console.log("knjlk");
        const clientid = body.client
        
         const rmid = await Reservedroom.findOne({_id: clientid });
        console.log(rmid);
      }
      else
      {

      this.match = false;
      const r = body.Room; 
      console.log(r);
         for (var i = 0; i < r.length; i++)
      {
        
         let Rmid = body.Room[i].Rooms[i].roomno.Roomid;
         console.log(Rmid);
        // const dte = await  Reservedroom.find({ "body.checkin":{ $lt: date }})

        const rmid = await  Reservedroom.find({ "body.Room.Rooms.roomno.Roomid": Rmid})
           console.log(rmid);
        if(rmid.length)
          {
             console.log(" roomId match");
          }
          else
          {
            console.log("giniv");
            this. match = true;
          }
      
        }
  
    console.log(this.match);
    if(this.match === true)
    {
       const body = req.body;
          const reservedroom = new Reservedroom (body);
         result = await reservedroom.save();
        
    }
    if(this.match === true)
    {
      res.status(200).send({
        code: 200,
        result,
        message: 'Rooms Booked Successfully',
      });
    }
  }
    } catch (error) {
      console.log('error', error);
      console.log("czd");
      return res.status(500).send(
        error
        );
    }
  };
  module.exports = roomController;