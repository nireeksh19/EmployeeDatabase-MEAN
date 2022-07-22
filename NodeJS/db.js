const mongoose = require('mongoose')

// connecting mongoose 
mongoose.connect('mongodb://localhost:27017/CrudDB',(err)=>{
    if(!err){
        console.log("Connected successfully..!!");
    }
    else{
        console.log('error in db connection: '+ JSON.stringify(err,undefined,2));
    }
});

module.exports = mongoose;

