var fs = require("fs"),
	tokml = require("tokml");

var rt = "PC_Data/States";
getDirectories(rt).forEach(convert);

function convert(state){
	var path = rt + "/" + state + "/" + state + "_PC";
	var obj = JSON.parse(fs.readFileSync(path + ".json", "utf8"));
	var kml = tokml(obj);
	fs.writeFileSync(path + ".kml", JSON.stringify(kml)); // write the file
}

// Get all directories in another directory
// Requires "fs"
function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}