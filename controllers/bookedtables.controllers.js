const tableController = {};
const Bookedtable = require('../models/bookedtables.model');
const jsonwebtoken =  require('jsonwebtoken');
tableController.booktable = async (req, res) => {
    try {
      let result;
      const body = req.body;
      //console.log(body);
      console.log(body.Table[0].Booked[0].tableno);
      this.match = false;
       const r = body.Table; 
      console.log(r.length);
         for (var i = 0; i < r.length; i++)
       {
        
         let tableid = body.Table[0].Booked[0].tableno;

        const tblid = await  Bookedtable.find({ "Table.Booked.tableno": tableid })
           console.log(tblid);
        if(tblid.length)
          {
             console.log(" tablid match");
            
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
          const  bookedtable = new  Bookedtable (body);
         result = await  bookedtable.save();
        
    }
    if(this.match === true)
    {
      res.status(200).send({
        code: 200,
        result,
        message: 'table booked',
      });
    }
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