# auto-changelog
Automatically generate a changelog based on the tags in your git repository

Uses node to run the `git tag -l  -n10` command against your repo, after which the HTML is saved to output.html.

## usage
Copy the files into a project folder, run `npm install` to get the dependencies.

Running `node server.js` or will give you a fresh changelog in HTML.

Alternatively, don't move the files, 'npm install' and try 'node server.js /path/to/git/repo'.