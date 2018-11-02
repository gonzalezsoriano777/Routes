const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema ({
    
    FirstName: { 
        type: String,
        required: true,
        unique: true,
    },
    
    LastName: {
        type: String,
        required: true,
        unique: true
    },
    AboutMe: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    Email: String,
    
})

module.exports = profile = mongoose.model("routers", ProfileSchema)