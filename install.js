var spawn = require("cross-spawn")
var which = require('which')
var path = require('path')
var copy = require('copy')
var git = which.sync("git")
var root = exec(git, ["rev-parse", "--show-toplevel"])
  .stdout.toString()
  .trim();
var copyPath = './src/utils'

init()

function init() {
  parsePath()

  copy('./src/*.js', path.join(root, copyPath), function (err, file) {
    if (err) {
      console.log('copy, fail: ', err)
      return
    }
    console.log('files coped: ', file.length)
  })
}

function parsePath() {
  try {
    json = require(path.join(root, 'package.json'))
    copyPath = json["guji-path"] || copyPath;
  } catch (e) {
    console.log('package.json fail, use default path: ' + copyPath, e)
  }
}

function exec(bin, args) {
  return spawn.sync(bin, args, {
    stdio: "pipe"
  });
}
