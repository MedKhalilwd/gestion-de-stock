const route = require('express').Router();
const categoryController = require("../Controller/categoryController");
const SubCategoryController = require("../Controller/SubCategoryController");
const multer = require('../Midlware/uploadImage');
const upload = require('../Midlware/uploadImage');
const passport = require('passport');
require('../Midlware/passport_auth').passport;



// les routes de categories
route.post('/createCategorie', categoryController.createCategorie);
route.get('/getAllCategories', categoryController.getAllCategories);
route.get('/getCategorieById/:id', categoryController.getCategorieById);
route.get('/getCategorieByName', categoryController.getCategorieByName);
route.put('/updateCategorie/:id', categoryController.updateCategorie);
route.delete('/deleteCategorie/:id', categoryController.deleteCategorie);

// les routes de sub_categorie
route.post('/createSubCategorie', SubCategoryController.createSubCategorie);
route.get('/getAllSubCategories', SubCategoryController.getAllSubCategories);
route.get('/getSubCategorieById/:id', SubCategoryController.getSubCategorieById);
route.get('/getSubCategorieByName', SubCategoryController.getSubCategorieByName);
route.put('/updateSubCategorie/:id', SubCategoryController.updateSubCategorie);
route.delete('/deleteSubCategorie/:id', SubCategoryController.deleteSubCategorie);
route.get('/getSubCategorieByCategorie',passport.authenticate('jwt', { session: false }),SubCategoryController.getSubCategorieByCategorie);



module.exports = route;






