const mongoose = require('mongoose');

const connection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then((res)=>{
            console.log("mongodb database is connected now ")
        }).catch((err)=>{
            console.log("mongodb database is not connected".err);
        })
    }
    catch(err){
        console.log("mongodb database is not ".err);
    }
}

module.exports = connection;