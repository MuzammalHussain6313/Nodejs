const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Rating = new Schema({

    propertyid: {
        type: String
       
    },
    userid:
    {
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

Rating.plugin(mongoosePaginate);

module.exports = mongoose.model("Rating", Rating);

