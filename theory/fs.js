const fs = require("fs");

fs.readFile("./test.txt", (error, data) => {
  console.log(data.toString());
});

fs.readFile("./test.txt", "utf8", (error, data) => {
  console.log(data);
});

//создание файлов
fs.readFile("./test.txt", "utf8", (error, data) => {
  //1 путь и имя, данные и 3 колбэк
  fs.writeFile("./test2.txt", `${data} test 2`, () => {});
});

//создание файлов в папку
fs.readFile("./test.txt", "utf8", (error, data) => {
  //1 путь и имя, данные и 3 колбэк
  fs.writeFile("./test2.txt", `${data} test 2`, () => {});
});

//создание файлов в папку, добавим синхроннсти так как не успевает создаться папка
fs.readFile("./test.txt", "utf8", (error, data) => {
  //create folder
  fs.mkdirSync("./files", () => {});
  //1 путь и имя, данные и 3 колбэк
  fs.writeFileSync("./files/test3.txt", `${data} test 3`, () => {});
});

setTimeout(() => {
  if (fs.existsSync("./files/test3.txt")) {
    //delete file only
    fs.unlink("./files/test3.txt", () => {});
  }
}, 4000);

setTimeout(() => {
  //delete empty folder on the uncomment underline
  //   fs.rmdir("./files", () => {});
  //  under this dont delet becose the folder does not exist test3
  if (fs.existsSync("./files/test3.txt")) {
    //delete file only
    fs.rmdir("./files", () => {});
  }
}, 6000);
