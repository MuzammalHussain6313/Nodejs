const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Resturantrating = new Schema({

    resturantid: {
        type: String
       
    },
    
    rating:
    {
        type: String
    },
    
    date:
    {
        type: String
    },
   
    is_deleted: {
        type: Boolean,
        default: false
    }
});

Resturantrating.plugin(mongoosePaginate);

module.exports = mongoose.model("Resturantrating", Resturantrating);

