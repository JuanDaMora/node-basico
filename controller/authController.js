const {response}= require('express');
const Usuario = require('../models/usuario');
const bcryptjs= require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-veriy');

const login =async(req, res=response)=> {

    const {correo,password} = req.body;
    try {
        //Verificar que exista el usuario 
        const usuario= await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }
        // Si el usuario esta activo 
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            })
        }

        //Verificar la constraseña 
        const validPassword= bcryptjs.compareSync(password,usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el Jwt
        const token = await generarJWT(usuario.id);
        

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }


}
const googleSingIn = async(req,res=response)=>{
    const {if_token}=req.body;
    const id_token=if_token;

    try{
        const {nombre,img,correo}=await googleVerify(id_token);
        let usuario=await Usuario.findOne({correo});
        

        if(!usuario){
            const data={
                nombre,
                correo,
                password:':P',
                img,
                rol: 'USER_ROLE',
                google:true
            };
            usuario= new Usuario(data);
            console.log(usuario);
            try {
                
                await usuario.save();
            } catch (error) {
                console.log('Error al guardar');
            }
        }else{
        }
        //si el usuario
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            });
        }
        
        //Generar el Jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,token

        })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        })
    }

}


module.exports={
    login,
    googleSingIn
}