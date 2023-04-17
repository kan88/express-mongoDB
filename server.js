const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log("Server request");
  console.log("nodemon on");
  res.setHeader("Content-Type", "text/html");

  const createPath = (page) => path.resolve(__dirname, "pages", `${page}.html`);
  let basePath = "";

  switch (req.url) {
    case "/":
    case "/home":
    case "/index.html":
      basePath = createPath("index");
      res.statusCode = 200;
      break;
    case "/about":
      res.statusCode = 301;
      res.setHeader("Location", "/catalog");
      res.end();
      break;
    case "/catalog":
      basePath = createPath("catalog");
      res.statusCode = 200;
      break;
    default:
      basePath = createPath("error");
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });

  // res.setHeader("Content-Type", "text/plain");
  // res.write("Hello from server");

  // res.setHeader("Content-Type", "text/html");
  // res.write("<h1>hello</h1>");

  // res.setHeader("Content-Type", "application/json");
  // const data = JSON.stringify([
  //   { name: "Tommy", age: 35 },
  //   { name: "Mila", age: 25 },
  // ]);
  // res.end(data);
});

server.listen(PORT, "localhost", (error) => {
  error ? console.log(error) : console.log(`listen port ${PORT}`);
});
