const { userName: user, sayHi } = require("./test");
// console.log(sayHi(user));

const os = require("os");

console.log(os.release(), os.platform());
