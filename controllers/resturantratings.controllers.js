const resturantratingController = {};
const Resturantratings = require('../models/resturantratings.model');
const jsonwebtoken =  require('jsonwebtoken');
resturantratingController.addreview = async (req, res) => {
    try {
  
        const body = req.body;
        const rating = new Resturantratings(body);
      const result = await rating.save();
       
        res.status(200).send({
          code: 200,
          result,
          message: ' ratting Successfull',
        });
      } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
      }
  };


  
  module.exports = resturantratingController;