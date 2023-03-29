const router = require('express').Router();
const user = require('../controller/userController')

router.post('/createUser',user.createUser);
router.get('/getUser/:id',user.getSingleUser);
router.get('/getAllUsers',user.getAllData)
router.get('/findUser',user.loginUser)

module.exports = router;