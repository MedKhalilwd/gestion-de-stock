const bcrypt = require("bcrypt");
const DOMAIN = process.env.APP_DOMAIN;
const SECRET = process.env.APP_SECRET;
const User = require("../Model/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

var RefreshTokens = [];

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohamedromdhani499@gmail.com",
    pass: process.env.APP_PASS,
  },
});

registerAdmin = async (req, res) => {
  try {
    req.body["picture"] = req.file.filename
    const password = bcrypt.hashSync(req.body.password, 8);
    const newAdmin = new User({
      ...req.body,
      password,
      role: "admin",
      
    });
    await newAdmin.save();

    res.status(200).json({
      message: "hurry! now account are successfuly created",
      data: newAdmin,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
registerProvider = async (req, res) => {
  try {
    req.body["picture"] = req.file.filename
    const password = bcrypt.hashSync(req.body.password, 8);
    const newProvider = new User({
      ...req.body,
      password,
      role: "provider",
    });
    await newProvider.save();

    res.status(200).json({
      message: "hurry! now account are successfuly created",
      data: newProvider,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getAllAdmin = async (req, res) => {
  try {

    const ListeAdmin = await User.find({});
    res.status(200).json({
      message: "admin information",
      data: ListeAdmin,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
getAllProvider = async (req, res) => {
  try {
    const ListeProvider = await User.find({});
    res.status(200).json({
      message: "provider information",
      data: ListeProvider,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, massage: "Email not found !" });
    }
    //   if (user.confirme === true) {
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      return res.status(404).json({
        status: 404,
        massage: "password Incorrect !",
      });
    }

    //2 eme etape creation de token, 1 ere etape l installation
    const token = jwt.sign(
      {
        id: user._id,
        user: user,
      },
      SECRET,
      {
        expiresIn: "7 days",
      }
    );
    var refreshToken = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 86400, //24hour
    });
    RefreshTokens[refreshToken] = user._id;

    const result = {
      email: user.email,
      user: user,
      token: token,
      expiresIn: 1,
      refreshtoken: refreshToken,
    };
    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true,
    });
    //   } else {
    //     return res.status(200).json({
    //       message: "you are not verified",
    //       success: false,
    //     });
    //   }
  } catch (error) {
    res.status(404).json({ status: 404, massage: error.message });
  }
};
LoginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, massage: "Email not found !" });
    }
      if (user.confirme === true ) {
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      return res.status(404).json({
        status: 404,
        massage: "password Incorrect !",
      });
    }

    //2 eme etape creation de token, 1 ere etape l installation
    const token = jwt.sign(
      {
        id: user._id,
        user: user,
      },
      SECRET,
      {
        expiresIn: "7 days",
      }
    );
    var refreshToken = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 86400, //24hour
    });
    RefreshTokens[refreshToken] = user._id;

    const result = {
      email: user.email,
      user: user,
      token: token,
      expiresIn: 1,
      refreshtoken: refreshToken,
    };
    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true,
    });
      } else {
        return res.status(200).json({
          message: "you are not verified",
          success: false,
        });
      }
  } catch (error) {
    res.status(404).json({ status: 404, massage: error.message });
  }
};
refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    console.log(req.user._id);
    console.log(RefreshTokens);
    console.log(RefreshTokens[refreshToken]);
    console.log("refresh", refreshToken in RefreshTokens);
    if (
      refreshToken in
      RefreshTokens /*&& RefreshTokens[refreshToken] == req.user._id*/
    ) {
      const token = jwt.sign(
        {
          user: req.user,
        },
        SECRET,
        {
          expiresIn: "15s",
        }
      );
      res.status(200).json({
        accesstoken: token,
      });
    } else {
      res.status(400).json({
        message: "token is not defind",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
confirmecompte = async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
  
      user.confirme = true;
      await user.save();
  
      transporter.sendMail(
        {
          to: user.email,
          subject: "welcome " + user.fullname,
          text: "welcome mr",
          html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <h2>Hello  ${user.fullname}!</h2>
                            <p>We're glad to have you on board at ${user.email}</p>
                        </body>
                        </html>`,
        },
        (err, info) => {
          if (err) {
            console.log("error : ", err.message);
          } else {
            console.log("Email sent : ", info.response);
          }
        }
      );
      return res.status(200).json({
        message: "Your account is now verified",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
 
  };
  confirmeCas = async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
  
      user.cas = true;
      await user.save();

      return res.status(200).json({
        message: "Delete account ",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
 
  };
  updateprofilAdmin= async (req, res) =>{
    try {
      await User.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({
        message: "Admin update",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  deleteProvider = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: "provider delete",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };
module.exports = {
  registerAdmin,
  getAllAdmin,
  Login,
  refreshToken,
  registerProvider,
  getAllProvider,
  LoginProvider,
  confirmecompte,
  updateprofilAdmin,
  deleteProvider,
  confirmeCas,
};
