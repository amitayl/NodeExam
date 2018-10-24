var fs = require('fs');
var path = require('path');
// As a global, it is always available to Node.js applications without using require() (as same as console)

if (process.argv.length < 4 || process.argv.length > 4) {
    console.log("USAGE: node search [EXT] [EXT]");
    process.exit(-1);
};

// argv[0] = process.execPath
// argv[1] = = path to the JavaScript file being executed
// argv[2] = = in our example must be the extention of the file such as 'txt'
// argv[3] = = in our example must be the the string to find in all files under the current directory 'txt'

var myPath = process.argv[1].slice(0, -10); // taking down the 'search.js' in order to have the path without the file name// var myPath = "C:\\Users\\amitayl\\Desktop" // taking down the 'search.js' in order to have the path without the file name
var new_file_name_and_path_extension = process.argv[2];
var string2search = process.argv[3];


function search_and_found(startingPoint, exten, string2search) {

    if (!fs.existsSync(startingPoint)) {		// a stop condition for the recursive function
        console.log("no dir ", startingPoint);
        return;
    }

    var files = fs.readdirSync(startingPoint);
    var fileFounds = 0;
    for (var i = 0; i < files.length; i++) {

        var new_file_name_and_path = path.join(startingPoint, files[i]);

        var stat = fs.lstatSync(new_file_name_and_path);
        if (stat.isDirectory()) {
            fileFounds += search_and_found(new_file_name_and_path, exten, string2search);
        }
        else if (new_file_name_and_path.lastIndexOf(exten) >= new_file_name_and_path.length - exten.length) {
            // make sure the extension is not part of the name and it is in the last part	

            // Here i have found a file with the desirable extention

            // search for the text inside the file
            var data = fs.readFileSync(new_file_name_and_path)
            if (data.indexOf(string2search) >= 0) {
                console.log(new_file_name_and_path);
                fileFounds++;
            }
        }
    };
    return fileFounds;
};

if (search_and_found(myPath, new_file_name_and_path_extension, string2search) === 0) {
    console.log("no file was found");
}
