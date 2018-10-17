var path = require("path");
var copy = require("copy");
var root = path.dirname(require.main.filename);

console.log(root, require.main.filename);

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
