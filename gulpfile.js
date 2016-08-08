const gulp = require('gulp');
const gls = require('gulp-live-server');
const del = require('del');
const runSeq = require('run-sequence');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const merge = require('merge2');
const serverUrl = 'server.js';
const serverProxy = 'http://localhost:3000';
const browserSyncPort = 3001;
var server;

gulp.task('default', ['init-browser-sync'], () => {
    server = gls(serverUrl);
    server.start();
    gulp.watch(serverUrl, () => {
        server.start.bind(server)();
    });
    gulp.watch('src/**/*', ['write-and-clean-then-reload']);
});

gulp.task('init-browser-sync', () => {
    browserSync.init({
        proxy: serverProxy,
        port: browserSyncPort
    });
});

gulp.task('write-and-clean-then-reload', (cb) => {
    runSeq('clean', 'write', 'reload', cb);
});

gulp.task('clean', () => {
    return del(['!dist/', 'dist/**/*']);
});

gulp.task('write', () => {
    return merge(
        gulp.src('src/**/!(*.ts)')
        ,
        gulp.src('src/**/*.ts')
            .pipe(ts(tsProject))
            .js
    ).pipe(gulp.dest('dist'));
});

gulp.task('reload', (cb) => {
    browserSync.reload();
    cb();
});