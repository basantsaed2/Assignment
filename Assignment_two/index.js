const path = require('path');

//1. Write a function that logs the current file path and directory.
function getCurrentPathAndDir() {
    return `{File:"${__filename}" , Dir:"${__dirname}"`;
}
console.log(getCurrentPathAndDir());

//2. Write a function that takes a file path and returns its file name.
function getFileName(filePath) {
    return path.basename(filePath);
}
const filePath = '/user/files/report.pdf';
console.log(getFileName(filePath)); // Output: report.pdf

//3.Write a function that builds a path from an object.
function buildPathFromObject(pathObj) {
    return path.format(pathObj);
}
const pathObj = {
    dir: '/user/files',
    base: 'report.pdf'
};
const pathObj2 = {
    root: '/',
    dir: 'user/files',
    name: 'report',
    ext: '.pdf'
};
console.log(buildPathFromObject(pathObj2)); // Output: user/files/report.pdf
console.log(buildPathFromObject(pathObj)); // Output: /user/files/report.pdf

//4. Write a function that returns the file extension from a given file path.
function getFileExtension(filePath) {
    return path.extname(filePath);
}
console.log(getFileExtension('/docs/readme.md')); // Output: .md

//5. Write a function that parses a given path and returns its name and ext.
function parsePath(filePath) {
    const parsed = path.parse(filePath);
    return `{ Name: "${parsed.name}" , Ext: "${parsed.ext}" }`;
}
console.log(parsePath('/home/app/main.js')); // Output: { name: 'main', ext: '.js' }

//6. Write a function that checks whether a given path is absolute.
function isAbsolute(filePath) {
    return path.isAbsolute(filePath);
}
console.log(isAbsolute('/home/user/file.txt')); // Output: true


//7. Write a function that joins multiple segments
function joinPathSegments(...segments) {
    return path.join(...segments);
}
console.log(joinPathSegments('src', 'components', 'App.js')); // Output: src/components/App.js

//8. Write a function that resolves a relative path to an absolute one.
function resolvePath(relativePath) {
    return path.resolve(relativePath);
}
console.log(resolvePath('./index.js')); // Output: C:\Users\Bassant\Downloads\AssignmentNodeJs\Assignment_two\index.js

//9. Write a function that joins two paths.
function joinTwoPaths(path1, path2) {
    return path.join(path1, path2);
}
console.log(joinTwoPaths('/folder1', 'folder2/file.txt')); // Output: \folder1\folder2\file.txt

//10. Write a function that deletes a file asynchronously.
const fs = require('fs').promises;
async function deleteFileAsync(filePath) {
    try {
        await fs.unlink(filePath);
        console.log(`The file is ${filePath} deleted.`);
    } catch (error) {
        console.error(`Error deleting file at ${filePath}:`, error);
    }   
}
// deleteFileAsync('./file.txt');

//11. Write a function that creates a folder synchronously.
const fsSync = require('fs');
function createFolderSync(folderPath) {
    try {
        fsSync.mkdirSync(folderPath);
        console.log(`Success`);
    } catch (error) {
        console.error(`Error creating folder at ${folderPath}:`, error);
    }
}
// createFolderSync('./newFolder');

//12. Create an event emitter that listens for a "start" event and logs a welcome message.
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
eventEmitter.on('start', () => {
    console.log('Welcome event triggered!');
});
eventEmitter.emit('start');

//13. Emit a custom "login" event with a username parameter.
eventEmitter.on('login', (username) => {
    console.log(`User logged in: ${username}`);
});
eventEmitter.emit('login', 'Ahmed');


//14. Read a file synchronously and log its contents.
function readFileSync(filePath) {
    try {
        const data = fsSync.readFileSync(filePath, 'utf8');
        console.log(`the file content => ${data}`);
    } catch (error) {
        console.error(`Error reading file at ${filePath}:`, error);
    }
}
readFileSync('./notes.txt');

//15. Write asynchronously to a file.
async function writeFileAsync(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`File written successfully to ${filePath}`);
    } catch (error) {
        console.error(`Error writing file at ${filePath}:`, error);
    }   
}
writeFileAsync('./async.txt', 'Async Save.');

//16. Check if a directory exists.
function checkDirectoryExists(dirPath) {
    try {
        const exists = fsSync.existsSync(dirPath);
        console.log(`${exists}`);
    } catch (error) {
        console.error(`Error checking directory at ${dirPath}:`, error);
    }   
}
checkDirectoryExists('./notes.txt');

//17. Write a function that returns the OS platform and CPU architecture.
const os = require('os');
function getOSInfo() {
    return `{ Platform: "${os.platform()}" , Arch: "${os.arch()}" }`;
}
console.log(getOSInfo());