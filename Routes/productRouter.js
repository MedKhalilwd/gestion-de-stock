const route = require('express').Router();
const authController = require("../Controller/authController");
const ProductController = require("../Controller/ProductController");
const multer = require('../Midlware/uploadImage');
const upload = require('../Midlware/uploadImage');
const passport = require('passport');
require('../Midlware/passport_auth').passport;

route.post('/createProduct',upload.array('picture'),/*multer.single('picture'),*/ ProductController.createProduct)
route.get('/getAllProduct',  ProductController.getAllProduct)
route.get('/getProductById/:id', ProductController.getProductById)
route.get('/getProductByName',ProductController.getProductByName)
route.put('/updateProduct/:id', ProductController.updateProduct)
route.delete('/deleteProduct/:id', ProductController.deleteProduct)

module.exports = route;
