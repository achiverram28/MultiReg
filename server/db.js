// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://127.0.0.1:27017/form-user")
//   .catch((error) => console.log(error));
// const { MongoClient } = require("mongodb");
// const uri = `mongodb://ram:${encodeURIComponent(
//   "123456789!@#$%^&*"
// )}@ac-vaaawja-shard-00-00.gwndkto.mongodb.net:27017,ac-vaaawja-shard-00-01.gwndkto.mongodb.net:27017,ac-vaaawja-shard-00-02.gwndkto.mongodb.net:27017/?ssl=true&replicaSet=atlas-oe7yp1-shard-0&authSource=admin&retryWrites=true&w=majority`;
// const client = new MongoClient(uri);
// const main = async () => {
//   try {
//     await client.connect();
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// };
// main();
const mongoose = require("mongoose");
try {
  mongoose.connect(
    //your monogodb link
  );
  console.log("Database connected");
} catch (err) {
  console.log(err);
}
