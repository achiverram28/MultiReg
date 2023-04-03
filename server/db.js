const mongoose = require("mongoose");
try {
  mongoose.connect(
    //your monogodb link
  );
  console.log("Database connected");
} catch (err) {
  console.log(err);
}
