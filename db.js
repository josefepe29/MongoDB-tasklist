const env = require("dotenv");
const mongoose = require("mongoose")
env.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true
        })
        console.log('Conexion a la base de datos realizada satisfactoriamente')
    } catch(error) {
        console.log(error)
    }
};

module.exports=connectDB