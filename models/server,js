const express = require('express')
var cors = require('cors');
const { dbConecction } = require('../database/config');
class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT || 3000;

        this.usersPath = '/api/users';

        //conecctar a base de datos

        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutes from app
        this.routes();
    }

    async conectarDB(){
        await dbConecction();
    }

    middlewares(){
        //cors
        this.app.use(cors())

        //Lectura y paseo del body
        this.app.use(express.json());
        //Directiorio Publico
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.usersPath,  require('../routes/users'));
     }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}
module.exports= Server; 
