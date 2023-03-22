const { Router } = require("express");
const { getUser, postUser, deleteUser, patchUser, putUser } = require("../controller/userController");



const router = Router();


router.get('/',getUser);

router.put('/:id',putUser);

router.post('/',postUser);

router.delete('/',deleteUser);

router.patch('/',patchUser);

module.exports = router;