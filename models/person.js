const mongoose = require('mongoose')
const Schema = mongoose.Schema


//Create a person with this prototype
const personSchema = new Schema({
    name:{type: String},
    age :{type:Number},
    favoriteFoods:{type:[String]},
   
})


module.exports= person=mongoose.model('person',personSchema);