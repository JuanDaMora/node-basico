const { usuario,Categoria, Product } = require('../models');
const Role = require('../models/role');




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
const existeCategoria= async (id)=>{
    //Verificar si la categoria existe 
    try {
        const existeCat = await Categoria.findById( id );
        if(!existeCat)throw new Error(`La categoria con id: ${id} no existe`)
    } catch (error) {
        throw new Error(`La categoria con id: ${id} no existe`)
    }
    // 
}

const existeProducto=async(id)=>{
    try {
        const existeProducto = await Product.findById(id);
        if(!existeProducto)throw new Error(`El producto con id: ${id} no existe`)
    } catch (error) {
        throw new Error(`El producto con id: ${id} no existe`)
    }
}

module.exports={
    esRolValido,
    emailExiste,
    userById,
    existeCategoria,
    existeProducto,
}