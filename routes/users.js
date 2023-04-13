const { Router } = require("express");
const { check } = require("express-validator");


const {validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole} = require('../middlewares')

const { esRolValido, emailExiste, userById } = require("../helpers/db-validator");
const { getUser, postUser, deleteUser, patchUser, putUser } = require("../controller/userController");

const router = Router();


router.get('/',getUser);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(userById),
    check('rol').custom(esRolValido),
    validarCampos
],putUser);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min:6}),
    check('correo', 'Correo invalido').isEmail(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido), 
    check('correo').custom(emailExiste),
    validarCampos
],postUser);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un Id valido').isMongoId(),
    check('id').custom(userById),
    validarCampos
],deleteUser);

router.patch('/',patchUser);

module.exports = router;