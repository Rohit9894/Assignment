const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connect = async () => {
  mongoose.connect(
    "mongodb+srv://Rohit:gupta9893@cluster0.rvdds93.mongodb.net/Adobe?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};
module.exports = connect;
