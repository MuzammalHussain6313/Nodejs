
const roomcodeController = {};
const Roomcodes = require('../models/roomcodes.model');
const jsonwebtoken =  require('jsonwebtoken');
roomcodeController.addcode = async (req, res) => {
    try {
    
      const body = req.body;
      this.match = false;
      const r = body.RoomReserved;
      console.log(r);
      for (var i = 0; i < r.length; i++)
      {
        console.log(r.length);
         let Rmid = body.RoomReserved[i];
         console.log(Rmid);
        const rmid = await  Roomcodes.find({ "RoomReserved": Rmid})
           console.log(rmid);
        if(rmid.length)
          {
             console.log(" already QR code generated");
          }
          else
          {
            console.log("giniv");
            this. match = true;
          }
      
    }

    if(this.match === true)
    {
      
      const roomcode= new Roomcodes(body);
      const result = await roomcode.save();
    
    }
    if(this.match === true)
    {
      res.status(200).send({
        code: 200,
        result,
        message: 'QRCode Added Successfully',
      });
    }

    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = roomcodeController;