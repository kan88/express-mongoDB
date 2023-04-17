const express = require("express");
const morgan = require("morgan");
const path = require("path");
const createPath = (page) =>
  path.resolve(__dirname, "pages-ejs", `${page}.ejs`);

const app = express();
app.set("view engine", "ejs");
const PORT = 8000;

app.listen(PORT, (error) => {
  error
    ? console.error(error)
    : console.log(`listen port http://localhost:${PORT}`);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static("styles"));

//for post requests need midleware bellow
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render(createPath("index"));
});

app.get("/contacts", (req, res) => {
  const contacts = [{ name: "Telegram", link: "http://telegram.com/kan_1988" }];
  res.render(createPath("contacts"), { contacts });
});

app.get("/about", (req, res) => {
  res.redirect("/contacts");
});

app.post("/add-post", (req, res) => {
  //show body
  // res.send(req.body);

  const { title, author, text } = req.body;

  const post = {
    id: new Date(),
    date: new Date().toLocaleDateString(),
    title,
    author,
    text,
  };

  res.render(createPath("post"), { post, title });
});

app.get("/add-post", (req, res) => {
  res.render(createPath("add-post"));
});

app.get("/posts/:id", (req, res) => {
  const post = {
    id: "1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.",
    title: "Post title",
    date: "05.05.2021",
    author: "Yauhen",
  };
  res.render(createPath("post"), { post });
});

app.get("/posts", (req, res) => {
  const posts = [
    {
      id: "1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.",
      title: "Post title",
      date: "05.05.2021",
      author: "Yauhen",
    },
  ];
  res.render(createPath("posts"), { posts });
});

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});
