const path = require('path');

const express = require("express");

const errorController = require('./controllers/error');

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("60e89a88e30e66bb08f65d3e")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb://nodejsraw:everson13@cluster0-shard-00-00.wu6no.mongodb.net:27017,cluster0-shard-00-01.wu6no.mongodb.net:27017,cluster0-shard-00-02.wu6no.mongodb.net:27017/nodejs?ssl=true&replicaSet=atlas-n1unka-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
  



