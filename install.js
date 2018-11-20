var path = require("path");
var copy = require("copy");

var copyPath = "./src/utils";

init();

function init() {
  parsePath();
  copy(__dirname + "/src/*.js", path.resolve(process.cwd(), copyPath), function(err, file) {
    if (err) {
      console.log("copy, fail: ", err);
      return;
    }
    console.log("files coped: ", file.length);
  });
}

function parsePath() {
  try {
    json = require(path.resolve("package.json"));
    copyPath = json["guji-path"] || copyPath;
  } catch (e) {
    console.log("package.json fail, use default path: " + copyPath, e);
  }
}
