var gulp  = require('gulp');
var shell = require('gulp-shell');

// to be ran from a valid repo directory, else change the first task like so:
// 'forever start src/server.js /path/to/project/'
gulp.task('renderChangelog', shell.task([
    'cd ..',
    'forever start auto-changelog/src/server.js',
    'phantomjs auto-changelog/src/render.js',
    'forever stop auto-changelog/src/server.js'
]));

gulp.task('default', ['renderChangelog']);
