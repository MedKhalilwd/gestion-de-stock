const Category = require('../Model/Category');
const Subcategory = require('../Model/Subcategory');
const Sub_Category = require('../Model/Subcategory');




const DOMAIN = process.env.APP_DOMAIN;
const SECRET = process.env.APP_SECRET;


createSubCategorie = async (req, res) => {
    try {
        //console.table('khalil');
        const newsubcategory = new Subcategory(req.body)
        const createsubcategory = await newsubcategory.save();
         
        await Category.findByIdAndUpdate(req.body.categorie, {
            $push: { sub_categories: createsubcategory},
        });

        res.status(201).json({
            message: "hurry! now sub_category are successfuly created",
            data: newsubcategory,
        })

    } catch (error) {
        res.status(400).json({
            message: error.message

        })
    }
}
getAllSubCategories = async (req, res) => {
    try {
        const listeSubCategory = await Subcategory.find({})
        .populate('categorie')
        res.status(200).json({
            message: 'liste of sub_category',
            data: listeSubCategory,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,

        });
    }

}
getSubCategorieById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById({ _id: req.params.id }).populate('categorie').populate('products');
        res.status(200).json({
            message: 'liste of sub_category',
            data: subcategory,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,

        });

    }

}
getSubCategorieByName = async (req, res) => {
    try {
        const subcategory = await Subcategory.find({ name: req.query.name }).populate('categorie').populate('products');
        res.status(200).json({
            message: 'liste of sub_category',
            data: subcategory,

        });
    } catch (error) {
        res.status(400).json({
            message: error.message,

        });

    }

}
updateSubCategorie = async (req, res) => {
    try {
        await Subcategory.updateOne({ _id: req.params.id }, (req.body))
        res.status(200).json({
            message: 'sub_category update',
        })

    } catch (error) {

        res.status(400).json({
            message: error.message,

        });
    }
}
deleteSubCategorie = async (req, res) => {

    try {
      const sub_category = await Subcategory.findById( {_id: req.params.id} ); 
      await Category.findByIdAndUpdate(sub_category.categorie, {
        $pull: { sub_categories: sub_category._id} 
        })
        //console.log(sub_categorie._id);
        await Sub_Category.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'sub_category delete',
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,

        });
    }
}
getSubCategorieByCategorie = async (req, res) => {
    try {
        const sub_category = await Sub_Category.find({ categorie: req.query.categorie }).populate('categorie');
        res.status(200).json({
            message: 'liste of sub_category',
            data: sub_category,

        });
    } catch (error) {
        res.status(400).json({
            message: error.message,

        });

    }

}


module.exports =
{
    createSubCategorie,
    getAllSubCategories,
    getSubCategorieById,
    getSubCategorieByName,
    updateSubCategorie,
    deleteSubCategorie,
    getSubCategorieByCategorie
}