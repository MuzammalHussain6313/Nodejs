const tableController = {};
const Bookedtable = require('../models/bookedtables.model');
const jsonwebtoken =  require('jsonwebtoken');
tableController.booktable = async (req, res) => {
    try {
      let result;
      const body = req.body;
      //console.log(body);
      console.log(body.Table.Booked);
      this.match = false;
      // const r = body.Room; 
      //console.log(r);
      //    for (var i = 0; i < r.length; i++)
      // {
        
      //    let tableid = body.Room[i].Rooms[i].roomno.Roomid;

      //   const tblid = await  Bookedtable.find({ "Room.Rooms.roomno.Roomid": tableid })
      //      console.log(rmid);
      //   if(tblid.length)
      //     {
      //        console.log(" tablid match");
            
      //     }
      //     else
      //     {
      //       console.log("giniv");
      //       this. match = true;
      //     }
      
      //   }
  
    console.log(this.match);
    // if(this.match === true)
    // {
    //    const body = req.body;
    //       const  bookedtable = new  Bookedtable (body);
    //      result = await  bookedtable.save();
        
    // }
    // if(this.match === true)
    // {
    //   res.status(200).send({
    //     code: 200,

    //     message: 'Table Booked Successfully',
    //   });
    // }
  }
     catch (error) {
      console.log('error', error);
      console.log("czd");
      return res.status(500).send(
        error
        );
    }
  };
  module.exports = tableController;