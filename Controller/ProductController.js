const Product = require("../Model/Product");
const User = require("../Model/User");

createProduct = async (req, res) => {
  try {
    req.body["gallery"] =
      req.files.length <= 0
        ? []
        : req.files.map(function (file) {
            return { name: file.filename, description: "add prod" };
          });
    // req.body["picture"] = req.file.filename

    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    await User.findByIdAndUpdate(req.body.provider, {
      $push: { products: product },
    });
    
    res.status(200).json({
      message: "hurry! now product are successfuly created",
      data: newProduct,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getAllProduct = async (req, res) => {
  try {
        // if (req.user == "Customer") {

    const listProduct = await Product.find({})
    res.status(200).json({
      message: "liste of Product",
      data: listProduct,
    });
    //  } else {
    //   return res.status(400).json({
    //     message: "user is not Customer",
    //   });
    // }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getProductById = async (req, res) => {
  try {
    const listeidProduct = await Product.findById({ _id: req.params.id, })
    res.status(200).json({
      message: "liste of Product",
      data: listeidProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getProductByName = async (req, res) => {
  try {
    const listenameProduct = await Product.find({ name: req.query.name, })
    res.status(200).json({
      message: "liste of Product",
      data: listenameProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
updateProduct = async (req, res) => {
  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: "Product update",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
deleteProduct = async (req, res) => {
  try {
    // const deletproduct = await Product.findById({ _id: req.params.id });
    // await Sub_Categorie.findByIdAndUpdate(deletproduct.sub_categorie, {
    //   $pull: { products: deletproduct._id }, //tjib l variable order mn orders
    // });
    //console.log(product._id);
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Product delete",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};



module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  getProductByName,
  updateProduct,
  deleteProduct,
};
