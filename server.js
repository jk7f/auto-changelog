// DEPENDENCIES
var git = require('gitty');
var fs = require('fs');

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
        if (tags[i]) {
            tags[i] = JSON.stringify(tags[i]);
        }
    }

}
removeWhitespace();
// get the git URL in order to extract the name from it client-side
var remote = myRepo.getRemotesSync();


function extractTitle (toExtract) {
    var begin = toExtract.search("dtcmedia/");
    var end = toExtract.search("nl.git");
    return toExtract.slice(begin+9, end-1);
}

var toWrite = '<body>'+
    '<script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.1/angular.min.js"></script>' +
    '<script>' +
    'var changeApp = angular.module("changeApp",[]);' +

    'changeApp.controller ("changeController", function ($scope) {' +
        '$scope.items = [' + tags +'];' +
        '$scope.project = "' + extractTitle(remote.origin) + '";' +
    '});' +
    '</script>' +
    '<main ng-app="changeApp" ng-controller="changeController">' +
        '<h3>Changelog voor {{project}}</h3>' +
        '<div>' +
            '<div ng-repeat="item in items.slice().reverse()">' +
                '<div>' +
                    '<h5>Release {{item[0]}}</h5>' +
                '</div>' +
                '<div>' +
                    '<p ng-repeat="message in item | limitTo:11:1  track by $index">{{message}}</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</main>' +
'</body>';

fs.writeFile('output.html', toWrite, function (err) {
    if (err) throw err;
    console.log("saved!");
});
