const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// app.use(express.json());

// routers
const userRoutes = require("./routes/auth.route");
const adminRoutes = require("./routes/admin/admin.route");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/products.router");
const cartRoutes = require("./routes/cart.route");
const initialDataRoutes = require("./routes/admin/initialData");

env.config();
// mongo connect
// mongodb+srv://root:<password>@cluster0.b2loh.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.b2loh.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("database connected");
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // no need bodyParser
app.use(cookieParser());

app.use("/public", express.static(`${__dirname}/upload`)); // map "/public" to "upload" folder
app.use("/api", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin", initialDataRoutes);

app.use("/api/category", categoryRoutes);

app.use("/api/product", productRoutes);

app.use("/api/user", cartRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello from server",
  });
});

app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: req.body,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listen from port: ${process.env.PORT}`);
});
