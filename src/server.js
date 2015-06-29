// DEPENDENCIES
var https = require('https');
var git = require('gitty');
var express = require('express');
var bodyParser = require ('body-parser');


// GIT STUFF
// check if path to project was passed, else run from current directory
function checkParams () {
    if (process.argv[2]) {
        console.log("Showing changelog from folder: ", process.argv[2]);
        return process.argv[2];
    } else {
        console.log("No directory specified, running from current directory");
        console.log("Usage: node server.js /path/to/project/");
        return process.cwd();
    }
}

var myRepo = git(checkParams());

// get the releases + associated messages
// TODO will crash when the directory is not a valid git repo, need a way to gracefully shut down with a clear message instead\
// Adapted version of getTagsSync which allows for custom params, not really future proof, also not good for sharing with npm install.
// Probably want to include all the code from gitty here.
var tags = myRepo.myGetTagsSync('-l -n10');

// The git tag command puts (exactly) eleven spaces between the version number and the message, use this to split the string
function removeWhitespace () {
    for (var i = 0; i < tags.length; i++) {
        tags[i] = tags[i].split("           ");
    }
}
removeWhitespace();

// get the git URL in order to extract the name from it client-side
var remote = myRepo.getRemotesSync();

// SERVER STUFF
var app = express();


// setup basic fileserver, allow access to everything in the /public directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// send the tags upon request
app.get('/tags', function (req, res) {
    res.send(tags);
});

// send the project url upon request
app.get('/project', function (req, res) {
    res.send(remote);
});

// launch the server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Check me out at port', port);

});
