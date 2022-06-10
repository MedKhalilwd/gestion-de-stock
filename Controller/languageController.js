const Language = require("../Model/Language");
// const Sub_Category = require("../Model/Subcategory");

createLanguage = async (req, res) => {
  try {
    const newLanguage = new Language(req.body);
    await newLanguage.save();

    res.status(201).json({
      message: "hurry! now Language are successfuly created",
      data: newLanguage,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getAllLanguage = async (req, res) => {
  try {
    const listelanguage = await Language.find({})
    res.status(200).json({
      message: "liste of language",
      data: listelanguage,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// getCategorieById = async (req, res) => {
//   try {
//     const categorie = await Category.findById({ _id: req.params.id }).populate(
//       "sub_categories"
//     );
//     res.status(200).json({
//       message: "liste of category",
//       data: categorie,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };
// getCategorieByName = async (req, res) => {
//   try {
//     const categories = await Category.find({ name: req.query.name }).populate(
//       "sub_categories"
//     );
//     res.status(200).json({
//       message: "liste of category",
//       data: categories,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };
// updateCategorie = async (req, res) => {
//   try {
//     await Category.updateOne({ _id: req.params.id }, req.body);
//     res.status(200).json({
//       message: "category update",
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };
// deleteCategorie = async (req, res) => {
//   try {
//     await Category.deleteOne({ _id: req.params.id });
//     res.status(200).json({
//       message: "category delete",
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };
module.exports = {
    createLanguage,
  getAllLanguage,
//   getCategorieById,
//   getCategorieByName,
//   updateCategorie,
//   deleteCategorie,
};
