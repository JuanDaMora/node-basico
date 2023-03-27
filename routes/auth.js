const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controller/authController.js");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();


router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe tener mas de 6 digitos').isLength({min:6}),
    validarCampos
],login);


module.exports=router;