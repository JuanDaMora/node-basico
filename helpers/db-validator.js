const Role = require('../models/role');
const usuario = require('../models/usuario');



const esRolValido = async(rol='USER_ROLE')=>{
    const existeRol=await Role.findOne({rol});
    if(!existeRol)throw new Error(`El rol ${rol} no esta registrado en la BD`)
}

const emailExiste= async (correo)=>{
    //Verificar si correo existe
    const existeaemail = await usuario.findOne({ correo });
    if(existeaemail)throw new Error(`El correo: ${correo} ya esta registrado`)
}
const userById= async (id)=>{
    //Verificar si el usuario existe
    const existeUsuario = await usuario.findById( id );
    if (!existeUsuario)throw new Error(`El usuario con id: ${id} no existe`)
}

module.exports={
    esRolValido,
    emailExiste,
    userById
}