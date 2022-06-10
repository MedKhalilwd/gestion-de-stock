const route = require('express').Router();
const authController = require("../Controller/authController");
const languageController = require("../Controller/languageController");
const multer = require('../Midlware/uploadImage');
const passport = require('passport');
require('../Midlware/passport_auth').passport;
// ADMIN
route.post('/registerAdmin', multer.single('picture'),authController.registerAdmin)
route.get('/getAllAdmin',authController.getAllAdmin)
route.put('/updateprofilAdmin/:id', authController.updateprofilAdmin)
route.post('/Login',authController.Login)
route.post('/refreshToken',passport.authenticate('jwt', { session: false }), authController.refreshToken)
// PROVIDER
route.post('/registerProvider', multer.single('picture'), authController.registerProvider)
route.get('/getAllProvider',authController.getAllProvider)
route.post('/LoginProvider',authController.LoginProvider)
route.get('/confirmecompte/:id',authController.confirmecompte)
route.get('/confirmeCas/:id',authController.confirmeCas)
route.delete('/deleteProvider/:id',authController.deleteProvider)


route.post('/createLanguage', languageController.createLanguage)
route.get('/getAllLanguage',languageController.getAllLanguage)
module.exports = route;
