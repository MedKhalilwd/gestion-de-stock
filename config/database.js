const { connect } = require("mongoose");
const { success, error } = require("consola");

const DB = process.env.APP_DB;
const connectDB = async () => {
  try {
    await connect(DB);
    success({
      message: `successfuly connected with the database \n ${DB}`,
      badge: true,
    });
  } catch (err) {
    error({
      message: `Unable to connect with Database \n ${err}`,
      badge: true,
    });
    connectDB();
  }
};
module.exports = connectDB();
