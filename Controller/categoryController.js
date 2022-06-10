const Category = require("../Model/Category");
const Sub_Category = require("../Model/Subcategory");

createCategorie = async (req, res) => {
  try {
    const newCategorie = new Category(req.body);
    await newCategorie.save();

    res.status(201).json({
      message: "hurry! now category are successfuly created",
      data: newCategorie,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getAllCategories = async (req, res) => {
  try {
    const listeCategorie = await Category.find({}).populate("sub_categories");
    res.status(200).json({
      message: "liste of category",
      data: listeCategorie,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getCategorieById = async (req, res) => {
  try {
    const categorie = await Category.findById({ _id: req.params.id }).populate(
      "sub_categories"
    );
    res.status(200).json({
      message: "liste of category",
      data: categorie,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getCategorieByName = async (req, res) => {
  try {
    const categories = await Category.find({ name: req.query.name }).populate(
      "sub_categories"
    );
    res.status(200).json({
      message: "liste of category",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
updateCategorie = async (req, res) => {
  try {
    await Category.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: "category update",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
deleteCategorie = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "category delete",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = {
  createCategorie,
  getAllCategories,
  getCategorieById,
  getCategorieByName,
  updateCategorie,
  deleteCategorie,
};
