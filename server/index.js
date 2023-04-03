const express = require("express");
require("./db");
const userRouter = require("./routers/user");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.get("/", (req, res) => {
  res.send("<h2>This is from index.js file </h2>");
});
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
