const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria} = require("../controller/categoriasController");
const { existeCategoria } = require("../helpers/db-validator");


const {validarJWT, validarCampos, esAdminRole} = require('../middlewares')

const router = Router();
/** 
 * {{url}}/api/categorias
*/

//obtener todas las categorias - publico
router.get('/',obtenerCategorias);

//obtener categoria por id - publico
router.get('/:id',[
    check('id','No es un id Mongo valido').isMongoId(),
    check('id','La categoria no existe').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

//crear categoria - cualquier persona con un token valido
router.post('/',[
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],crearCategoria)

//actualizar categoria por id- cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id','No es un id Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);
//Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    check('id','No es un id Mongo valido').isMongoId(),
    check('id','La categoria no existe').custom(existeCategoria),
    esAdminRole,
    validarCampos
],borrarCategoria);


module.exports = router;