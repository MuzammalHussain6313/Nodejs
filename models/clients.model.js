const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Client = new Schema({
    id: {
        type: Number,
        unique: true,
        sparse:true
    },
     firstname: {
        type: String
    },
    lastname: {
        type: String
    },
     email: {
        type: String,
        required:true,
        unique: true,
        sparse:true

    },
     password: {
        type: String
    },
    secretToken: {
        type: String
    },
    active:{
        type:Boolean
    },
    
    role: {
        type: String
    },
    department: {
        type: String
    },
    designation: {
        type: String
    },
    avatar: {
        type: String
    },
    avatar_ext: {
        type: String
    },

    
    is_deleted: {
        type: Number,
        default: 0
    }
});

Client.plugin(mongoosePaginate);

Client.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }
// User.index({'$**': 'text'});

module.exports = mongoose.model("Client", Client);