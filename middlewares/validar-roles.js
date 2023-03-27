const { response } = require("express")




const esAdminRole=(req,res=response,next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verifiar el role sin validar el token'
        })
    }
    const {rol,nombre}=req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador - no se puede hacer esto`
        })
    }

    next();
}

module.exports={
    esAdminRole
}