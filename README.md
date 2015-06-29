# auto-changelog
Automatically generate a changelog based on the tags in your git repository

Uses node to run the `git tag -l  -n10` command against your repo, after which an express server hosts an angular website. The rendered HTML is then saved to output.html using phantomjs (hey, it works, leave me alone).

## usage
Copy the files into a project folder, run `npm install` to get the dependencies.

Running `gulp` or `gulp renderChangelog` will give you a fresh changelog in HTML
