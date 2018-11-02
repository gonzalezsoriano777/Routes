const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema ({
    
    FirstName: String,
    LastName: String,
    AboutMe: String,
    Age: Number,
    Email: String,
    
    
    
})