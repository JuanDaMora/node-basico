const {response}= require('express');
const bcryptjs= require('bcryptjs');

const Usuario = require('../models/usuario');




const getUser=async(req, res)=> {
  const {limite=5,desde=0}=req.query;
  const query={estado:true}


  const [total,usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
        .skip(desde)
        .limit(limite)
  ])
  
    res.json({
        total,
        usuarios
    });
  }

  const postUser = async(req, res)=> {

    const {nombre, correo, password, rol}= req.body;
    const usuario= new Usuario({nombre,correo,password,rol});


    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password= bcryptjs.hashSync(password,salt);
    console.log(usuario);
    //Guardar en BD
    await usuario.save();


    res.json({
        usuario
    });
  }

  const putUser =async (req, res=response)=> {
    
    const {id }= req.params;
    const {password, google, ...resto}= req.body;

    //TODO: Validar contra Base de datos
    if(password){
      const salt = bcryptjs.genSaltSync(10);
      resto.password= bcryptjs.hashSync(password,salt);
    }
    const usuario= await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'put API Controller',
        usuario
    });
  }
  
  const patchUser =(req, res)=> {

    res.json({
        msg: 'patch API Controller'
    });
  }
  const deleteUser =async(req, res)=> {
    const {id}=req.params;
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false});
    

    res.json(
      usuario
    );
  }

  module.exports={
    getUser,
    patchUser,
    putUser,
    deleteUser,
    postUser
  }