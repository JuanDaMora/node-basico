const express = require('express')
var cors = require('cors');
const { dbConecction } = require('../database/config');
class Server{
    constructor(){
        this.app = express();

        this.port=process.env.PORT;

        this.paths={
            auth:       '/api/auth',
            buscar:       '/api/buscar',
            users:      '/api/users',
            categorias: '/api/categorias',
            products: '/api/productos'
        }


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

        
        this.app.use(this.paths.auth,       require('../routes/auth'));
        this.app.use(this.paths.buscar,     require('../routes/buscar'));
        this.app.use(this.paths.users,      require('../routes/users'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.products,   require('../routes/products'));
     }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports= Server; 


