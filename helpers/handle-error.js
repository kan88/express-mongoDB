const createPath = require("./create-path");

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath("error"), { title: "error" });
};

module.exports = handleError;
