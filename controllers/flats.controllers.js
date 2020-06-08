const flatsController = {};
const Flats = require('../models/flats.model');
const Ratings = require('../models/ratings.model');
const jsonwebtoken =  require('jsonwebtoken');
flatsController.getAll = async (req, res) => {
  let flats;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    flats = await Flats.paginate(
      merged,
      {
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: flats
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
flatsController.addBook = async (req, res) => {
  try {
  
    const body = req.body;
 
    const flat= new Flats(body);
  const result = await flat.save();
   const idd = result._id;
   console.log(idd);
    res.status(200).send({
      code: 200,
      result,
      message: 'Flat Added Successfully',
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

flatsController.addreview = async (req, res) => {
  try {
  
    const body = req.body;
 
    const flat= new Flats(body);
  const result = await flat.save();
    res.status(200).send({
      code: 200,
      result,
      message: 'Flat Added Successfully',
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


module.exports = flatsController;
flatsController.getFlat = async (req, res) => {

  try {
  
    const owner = req.params.owner;
   
   let myflats = await Flats.find({ owner: owner});
   
   let flats = JSON.parse(JSON.stringify(myflats))

   for (let item of flats){

    const id = item._id;
    const reviews = await Ratings.find({userid: id});
    let reviewsTotal = 0;
    if(reviews.length)
    {
           const adrom =[];
        for (let review of reviews)
        {

          adrom.push(review.rating)
          
        }
        var sumNumber = adrom.reduce((acc, cur) => acc + Number(cur), 0) ;
    reviewsTotal = Number( sumNumber / reviews.length);

    }

    item['reviewsTotal'] = reviewsTotal;

   }

    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: flats
        
    });
   
  }
  catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

flatsController.deleteBook = async (req, res) => {
  if (!req.params.id) {
    Fu;
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params.id;

    const result = await Flats.findOneAndDelete({
      _id: _id
    });
   
    res.status(200).send({
      code: 200,
      message: 'Deleted Successfully'
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

flatsController.updateBook = async (req, res) => {
  if (!req.params.id) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params.id;
    let updates = req.body;
    const result = await Flats.updateOne(
      {
        _id: _id
      },
      {
        $set: updates
      },
      {
        upsert: true,
        runValidators: true
      }
    );
    if (result.nModified == 1) {
      res.status(200).send({
        code: 200,
        message: 'Updated Successfully'
      });
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

// async function runUpdate(_id, updates, res) {
//   try {
//     const result = await Books.updateOne(
//       {
//         _id: _id
//       },
//       {
//         $set: updates
//       },
//       {
//         upsert: true,
//         runValidators: true
//       }
//     );

//     {
//       if (result.nModified == 1) {
//         res.status(200).send({
//           code: 200,
//           message: 'Updated Successfully'
//         });
//       } else if (result.upserted) {
//         res.status(200).send({
//           code: 200,
//           message: 'Created Successfully'
//         });
//       } else {
//         res.status(422).send({
//           code: 422,
//           message: 'Unprocessible Entity'
//         });
//       }
//     }
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// }
// async function runUpdateById(id, updates, res) {
//   try {
//     const result = await books.updateOne(
//       {
//         id: id
//       },
//       {
//         $set: updates
//       },
//       {
//         upsert: true,
//         runValidators: true
//       }
//     );

//     if (result.nModified == 1) {
//       res.status(200).send({
//         code: 200,
//         message: 'Updated Successfully'
//       });
//     } else if (result.upserted) {
//       res.status(200).send({
//         code: 200,
//         message: 'Created Successfully'
//       });
//     } else {
//       {
//         res.status(200).send({
//           code: 200,
//           message: 'Task completed successfully'
//         });
//       }
//     }
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// }