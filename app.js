const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const postRouters = require("./routes/post-routes");
const contactsRouters = require("./routes/contacts-routes");
const createPath = require("./helpers/create-path");

const db = "mongodb://localhost:27017/nodeblog";
const PORT = 8000;
mongodb: mongoose
  .connect(db)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const app = express();

app.set("view engine", "ejs");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(methodOverride("_method"));
app.use(express.static("styles"));

app.listen(PORT, (error) => {
  error
    ? console.error(error)
    : console.log(`listen port http://localhost:${PORT}`);
});

//for post requests need midleware bellow
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render(createPath("index"));
});

app.use(postRouters);
app.use(contactsRouters);

app.get("/about", (req, res) => {
  res.redirect("/contacts");
});

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});
