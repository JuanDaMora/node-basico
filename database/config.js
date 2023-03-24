const mongoose = require('mongoose')

const dbConecction = async() => {
    try {
        mongoose.connect(process.env.MONGOSB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la coneccion con la base de datos') ;
    }

}

module.exports={
    dbConecction
}