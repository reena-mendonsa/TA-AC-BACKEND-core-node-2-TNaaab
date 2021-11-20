const relativePath = './index.html';
const absPath = __dirname;
console.log(__dirname);
console.log(__filename);
console.log(absPath + '/index.html');


const path = require("path");
const indexPath = path.join(__dirname, "index.js");
console.log(indexPath);
