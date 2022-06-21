const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const userSchema = require('./user');
const commentSchema = require('./commentSchema');


const eventSchema = new Schema({
    eventTitle: {type: String, required: true, default: ""},
    eventDetails: {type: String, required: true, default: ""},
    isHappening: {type: Boolean, default: false},
    eventDate: {type:Date},
    minAttendees: {type: Number, default: 2},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    attendees: {type: Array, default: []},
    comments: [commentSchema],

},{ timestamps: true,
    toJSON: {virtuals: true}
}
);

eventSchema.methods.addCommentToEvent = async function(commentId) {
    
    const event = this;
    console.log('This is the commentId used: ', commentId);
    const comment = await mongoose.model('Comment').findById(commentId)
    console.log("This is the comment from mongoose model: ", comment)
    event.comments.push(comment);

    return event.save()


}

module.exports =  mongoose.model('Event', eventSchema);