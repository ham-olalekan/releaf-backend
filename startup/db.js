const config = require("../config/Config");
const mongoose = require("mongoose");

module.exports = function () {
    const uri = config.db.url;
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,d
      })
      .then(() => console.log("MongoDB connected...."))
      .catch((err) => console.log(err));
  };