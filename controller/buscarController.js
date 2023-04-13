const { response } = require("express");
const { Usuario,Categoria,Product } = require("../models");
const{ObjectId}=require('mongoose').Types;

const coleccionesPermitidas=[
    'usuarios',
    'categoria',
    'products',
    'roles'
];

const buscarUsuarios=async(termino='',res=response)=>{
    const esMongoId=ObjectId.isValid(termino)
    if(esMongoId){
        const usuario=await Usuario.findById(termino);
        return res.json({
                results:(usuario)?[usuario]:[]
            });
    }

    const regex = new RegExp(termino,'i')

    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    });

    res.json({
        results:usuarios
    })
}
const buscarCategorias=async(termino='',res=response)=>{
    const esMongoId =ObjectId.isValid(termino);
    if(esMongoId){
        const categoria=await Categoria.findById(termino);
        return res.json({
            results:(categoria)?[categoria]:[]
        })
    }
    const regex= new RegExp(termino,'i');

    const categorias= await Categoria.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    })

    res.json(categorias)

}
const buscarProductos=async(termino='',res=response )=>{
    const esMongoId =ObjectId.isValid(termino);
    console.log('1');
    if(esMongoId){
        const producto=await Product.findById(termino).populate('categoria','nombre');
        if(!(producto==null)){
            return res.json({
                results:(producto)?[producto]:[]
            })
        }
        const usuario=await Usuario.findById(termino);
        if(!(usuario==null)) {
            console.log(usuario);
            const productos= await Product.find({usuario:usuario._id}
            ).populate('categoria','nombre');
            console.log(productos);
            return res.json({
                results:(productos)?[productos]:[]
            })
        }
    }
    const regex= new RegExp(termino,'i');


    const productos= await Product.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    }).populate('categoria','nombre');

    res.json(productos);

}

const buscar=(req,res=response)=>{

    const {coleccion,termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion))res.status(400).json({msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`})

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;
        case 'categoria':
            buscarCategorias(termino,res)
            break;
        case 'products':
            buscarProductos(termino,res)
            break;
        default:
            res.status(500).json({msg:'Olvide hacer esta busqueda'})
    }



}

module.exports={
    buscar
}