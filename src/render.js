var fs = require('fs');
var output = 'output.html';
var page = require('webpage').create();
page.open('http://localhost:3000', function(status) {
  console.log("Status: " + status);
  if(status === "success") {

    fs.write(output, page.content, 'w');
  }
  phantom.exit();
});
