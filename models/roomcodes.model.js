const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Roomcodes = new Schema({
    clientid:{
        type: String
       
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    RoomReserved: {
        type: Array   
    },
    
    
});

Roomcodes.plugin(mongoosePaginate);

module.exports = mongoose.model("Roomcodes", Roomcodes);