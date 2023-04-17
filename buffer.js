//readable, writtable, duplex, transform - read, write, both, both with change exp zip

const fs = require("fs");

const readStream = fs.createReadStream("./lorem.txt");

//underline we only read
// readStream.on("data", (chunk) => {
//   console.log("___________________");
//   console.log(chunk.toString());
// });

//underline read and write almost duplex

const writeStrem = fs.createWriteStream("./new-lorem.txt");

// readStream.on("data", (chunk) => {
//   writeStrem.write("\n____+++++++++++++___\n");
//   writeStrem.write(chunk);
// });

const handleError = () => {
  console.log("Error");
  readStream.destroy();
  writeStrem.end("Finish with error");
};

// readStream.on("error", handleError).pipe(writeStrem).on("error", handleError);

// //for error uncomment bellow
// const readStream = fs.createReadStream("./nolorem.txt");
// readStream
// .on("error", handleError)
// .pipe(writeStrem)
// .on("error", handleError);

// the last one is transform strem

const zlib = require("zlib");

const compressStream = zlib.createGzip();

readStream
  .on("error", handleError)
  .pipe(compressStream)
  .pipe(writeStrem)
  .on("error", handleError);
