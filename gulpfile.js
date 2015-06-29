var gulp  = require('gulp');
var shell = require('gulp-shell');

// to be ran from the crm.dtcmedia.nl repo directory, else change the first task like so:
// 'forever start src/server.js /path/to/project/'
gulp.task('renderChangelog', shell.task([
    'forever start src/server.js',
    'phantomjs src/render.js',
    'forever stop src/server.js'
]));

gulp.task('default', ['renderChangelog']);
