const { Router } = require("express");
const { check } = require("express-validator");


const {validarJWT, validarCampos, esAdminRole, tieneRole} = require('../middlewares');
const { obtenerCategoria, obtenerCategorias } = require("../controller/categoriasController");
const { crearProduct, obtenerProducts, actualizarProducto, borrarProducto, obtenerProduct } = require("../controller/productController");
const { existeProducto } = require("../helpers/db-validator");

const router = Router();

router.get('/',obtenerProducts)


router.get('/:id',[
    check('id','No es un id Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProduct)


router.post('/',[
    validarJWT,
    tieneRole,
    validarCampos,
],crearProduct)


router.put('/:id',[
    validarJWT,
    check('id','No es un id Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos,

],actualizarProducto)


router.delete('/:id',[
    validarJWT,
    check('id','No es un id Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    esAdminRole,
    validarCampos
],borrarProducto)





module.exports = router;