var http = require("http")
	unzip = require("unzip"),
	fs = require("fs");

function download(url, dest, cb){
	var file = fs.createWriteStream(dest);
	var request = http.get(url, function(response) {
		response.pipe(file);
	  	file.on("finish", function() {
	  		file.close(cb);  // close() is async, call cb after close completes.
		}).on('error', function(err) { // Handle errors
			fs.unlink(dest); // Delete the file async. (But we don't check the result)
		    if (cb) cb(err.message);
		});
	});
}

download("http://eci.nic.in/eci_main/GisLayers/GIS_PC_Data.zip", "PC_data.zip", function(){
	// unzip it
	fs.createReadStream("PC_data.zip").pipe(unzip.Extract({ path: "." }));
	// delete the zip file
	fs.unlink("PC_data.zip");
});