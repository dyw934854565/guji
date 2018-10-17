var path = require("path");
var copy = require("copy");
var root = process.mainModule.paths
  .filter(p => !p.includes("node_modules"))
  .shift();
console.log(root, process.mainModule.paths);

var copyPath = "./src/utils";

init();

function init() {
  parsePath();

  copy("./src/*.js", path.join(root, copyPath), function(err, file) {
    if (err) {
      console.log("copy, fail: ", err);
      return;
    }
    console.log("files coped: ", file.length);
  });
}

function parsePath() {
  try {
    json = require(path.join(root, "package.json"));
    copyPath = json["guji-path"] || copyPath;
  } catch (e) {
    console.log("package.json fail, use default path: " + copyPath, e);
  }
}
