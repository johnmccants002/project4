const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const userSchema = require('./user');

const commentSchema = new Schema(
    {   
     user: {type: Schema.Types.ObjectId, ref: 'User'},
     commentText: {type: String},
    }, 

    { 
     timestamps: true, 
    }
);

module.exports = commentSchema;