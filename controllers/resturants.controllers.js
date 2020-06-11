const resturantsController = {};
const Resturants = require('../models/resturants.model');
const jsonwebtoken =  require('jsonwebtoken');
resturantsController.addresturant = async (req, res) => {
    try {
    
      const body = req.body;
   
      const resturant= new Resturants(body);
      const result = await resturant.save();
      res.status(200).send({
        code: 200,
        result,
        message: 'resturant Added Successfully',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  resturantsController.getAll = async (req, res) => {
    let resturant;
    try {
      let merged = {};
      const start = 0;
      const length = 100;
      resturant = await Resturants.paginate(
        merged,
        {
          offset: parseInt(start),
          limit: parseInt(length)
        }
      );
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: resturant
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };
  module.exports = resturantsController;