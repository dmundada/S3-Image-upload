const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/moonbook"

const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("DB connection successful!")
    })
}

module.exports=connectToMongo