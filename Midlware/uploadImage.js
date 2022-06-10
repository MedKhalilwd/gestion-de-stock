const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      return cb(null, './Storage')
  },
  filename: (req, file, cb) =>{
    /*methode simple
    cb(null, file.originalname);
*/

cb(null, new Date().toISOString().replace(/:/g, '-' )+ file.originalname);
  },

});
const fileFilter = (req, file, cb) =>{
  if(
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' 

  )
  {
    cb(null, true);

  }else{
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};

module.exports = multer({storage:storage})


