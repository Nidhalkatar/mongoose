const mongoose = require ('mongoose')
const express = require('express')
const router =express.Router()
const app= express() 
const Person =require('./models/person')



mongoose.
connect('mongodb://localhost:27017/mongoose-check')
.then (()=>console.log('database connected'))
.catch(err=>console.log(err))

//app.use(express.json())
app.get('/personneList',(req,res)=>{
    res.sendFile(__dirname + '/Route/Personne')
})
app.use(express.static(__dirname + '/Route'));
//Create and Save a Record of a Model
const person = new Person ({
    name:'MOUNIR',
    age:99,
    favoriteFoods:["MO9LI","LABLABI"],
    email:'MOUNIR@gmail.com'
     })
      person.save()
       .then(doc => {
         console.log(doc)
       })
       .catch(err => {
         console.error(err)
       })
       //Create Many Records with model.create()
       let arrayOfPeople=[
        {name:"RACHED", age:90, favoriteFoods:["KOUSKOUS", "MA9ROUNA"]},
        {name:"HAMMA", age:65, favoriteFoods:["KAFTAJI", "S7AN TOUNSI"]},
        { name: "YASSIN", age: 37, favoriteFoods: ["MLOUKHIYA", "LOUBIA"] },
        {name:"KAISOUN", age:70, favoriteFoods:["MECHWI HOUT", "CAPPUSIN"]}]
        
          Person.create(arrayOfPeople,(error,data)=>{
            {
              if (error){
                return console.log(error);
              }else 
              {return console.log(null, data) 
                  }
            };
          })
          //Use model.find() to Search Your Database
          Person.find({name:"KAISOUN"},(error,data)=>{
            {
              if (error){
                return console.log(error);
              }else 
              {return console.log(null, data) 
                  }
            };
          })
          //Use model.findOne() to Return a Single Matching Document from Your Database
          Person.findOne({favoriteFoods:{ $all: ['KAFTAJI']}},(error,data)=>{
            if (error){console.log(error)}
            else{
              return console.log(null, data)
            }
          })
          //Use model.findById() to Search Your Database By _id
          Person.findById ({id:"61638609c1488d8e6f4239b9"},(error,data)=>{
            if (error){console.log(error)}
            else{
              return console.log(null, data)
            }
          })
          //Perform Classic Updates by Running Find, Edit, then Save
          Person.findOne({name:"KAISOUN"},(error,data)=>{

            if (error){console.log(error)}
            else{
          data.favoriteFoods.push("TACOS")
          data.save()
            }
          })
          //Perform New Updates on a Document Using model.findOneAndUpdate()
          Person.findOneAndUpdate({age: 70}, {$set:{name:"saiid"}}, {new: true}, (err, data) => {
            if (err) {
                console.log("Something went wrong");
            }
        
            console.log(data);
        }); 
        //Delete One Document Using model.findByIdAndRemove
        personID="61638a764bdd7b6adaa0adf0"
      Person.findByIdAndRemove({personID},(error,data)=>{
        if (error) {console.log("error")}
        else{
          return console.log(null, data)
        }
       })
       //MongoDB and Mongoose - Delete Many Documents with model.remove()
       Person.remove({ name: "yassin" }, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          return console.log(null, data);
        }
      });
      //Chain Search Query Helpers to Narrow Search Results
      Person.find({favoriteFoods: ["LOUBIA"]})
  .sort({name:'asc'})
  .limit(2)
  .select('-age')
  .exec((error,data)=>{
    if (error){console.log(error)}
    else{
      return console.log(null,data)}
  })
  app.listen(5000)
