var fs = require('fs');
var gulp = require('gulp');
var glob = require('glob');
var shelljs = require('shelljs');



/**
 * Source shipping to gitlap
 */
gulp.task('ship-to-gitlap', function (done) {
  var gitPath="https://gitlab.syncfusion.com/ramya.manickam/test";
      var clone = shelljs.exec('git clone ' + gitPath + ' -b master'+ ' ' + `./gitlapRepo/docs`, {
            silent: false
        });
  if (clone.code !== 0) {
            console.log(clone.stderr);
            done();
            return;
        } else {
            console.log('Clone has been completed...!');
            shelljs.cp('-rf', `docs/*`, `./gitlapRepo/docs`);
            shelljs.cd(`./gitlapRepo/docs`);
            shelljs.exec('git add .');
            shelljs.exec('git pull');
            shelljs.exec('git commit -m \"ci-skip(EJ2-000): source updation from github repo [ci skip]\" --no-verify');
            shelljs.exec('git push');
            shelljs.cd('../../');
        }
});
