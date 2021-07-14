const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const MONGO_URI = "mongodb://localhost:27017/centerSystem";
const MongoStore = require("connect-mongo");
const PORT = 8095;
const router = require("./router/router");
// const router = require("./route/route");
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to mongodb successfully"))
  .catch((err) => console.error("could not connect to mongodb", err));
app.use("/", router);
app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);
    res.Status(err.Status || 500).json({
      error: err.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`server listening at port:${PORT}`);
});
