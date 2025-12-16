const fs = require("fs");
const path = require("path");
const filePath = path.resolve("./big.txt");
const zlib = require('zlib');

// Part1: Core Modules
// 1. Use a readable stream to read a file in chunks and log each chunk.
const stream = fs.createReadStream(filePath, {
    encoding: "utf-8",
    highWaterMark: 64 * 1024
});
stream.on("data", (chunk) => {
    console.log(chunk);
});
stream.on("end", () => {
    console.log("End of file Success");
});

// 2.Use readable and writable streams to copy content from one file to another.const sourcePath = path.resolve("./source.txt");
const sourcePath = path.resolve("./source.txt");
const destPath = path.resolve("./dest.txt");
const sourceStream = fs.createReadStream(sourcePath);
const destStream = fs.createWriteStream(destPath);
sourceStream.pipe(destStream);
sourceStream.on("end", () => {
    console.log("End of file Success");
});

//3. Create a pipeline that reads a file, compresses it, and writes it to another file.
fs.createReadStream('data.txt')
    .pipe(zlib.createGzip()) // Compress the file
    .pipe(fs.createWriteStream('data.txt.gz')) // Write the compressed file
    .on('finish', () => {
        console.log('File compressed successfully!');
    });






