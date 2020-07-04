const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Bookedtable = new Schema({
    clientid:{
        type: String
       
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    Table: {
        type: Array   
    },

   
    
});

Bookedtable.plugin(mongoosePaginate);

module.exports = mongoose.model("Bookedtable", Bookedtable);