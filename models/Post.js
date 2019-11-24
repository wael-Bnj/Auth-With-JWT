const mongoose  = require('mongoose');

const PostSchema = mongoose.Schema({
    title:{
        type:String
    },
    subtitle :{
        type: String
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Post',PostSchema);