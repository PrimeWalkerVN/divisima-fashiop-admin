// Create an instance of model superAdmin
let Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
let mongoose = require('mongoose');
let baseUrl = "mongodb+srv://letrungtiennbk9:Trungtienle9@cluster0-hjpbg.mongodb.net/shopping?retryWrites=true&w=majority"

//let baseUrl = "mongodb://localhost:27017/shopping"
let mongoDB = baseUrl;
let done = 0;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });                  

const superAdmin =
    new Admin ({
        username: 'primewalker',
        name: 'ProPlayer',
        email: 'nthanh609@gmail.com',
        isSuperAdmin: true,
        password:'1234567'
});
bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(superAdmin.password, salt, (err, hash) => {
                  if(err) throw err;
                  //set new password   
                  superAdmin.password = hash;
                  superAdmin.save().then(superAdmin=>{
                    mongoose.disconnect();
                  }).catch(err => console.log(err));
                  done++;
}));
done = 0;