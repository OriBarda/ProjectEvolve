const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = 3000;
dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
