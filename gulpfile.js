var fs = require('fs');
var gulp = require('gulp');
var glob = require('glob');
var shelljs = require('shelljs');


var user = process.env.GIT_USER;
var token = process.env.GIT_TOKEN;
var user_mail = process.env.GIT_MAIL;

/**
 * Source shipping to gitlap
 */
gulp.task('ship-to-gitlap', function (done) {
    console.log('---check---' + user_mail);
    console.log('---user---' + user);
     shelljs.exec(`git config --global user.email "${user_mail}"`);
    shelljs.exec(`git config --global user.name "${user}"`);

    var changes = shelljs.exec(`git diff --name-only HEAD^ HEAD`);
    console.log('--changes----' + changes);

   
       var gitPath ='https://'+ user + ':' + token +`@gitlab.syncfusion.com/bold-reports/cloud-docs`;
        console.log('Clone has been started...!');
  
        var clone = shelljs.exec('git clone ' + gitPath + ' -b master' , {
            silent: false
        });
        if (clone.code !== 0) {
            console.log(clone.stderr);
            done();
            return;
        } else {
            console.log('Clone has been completed...!');
      shelljs.cp('-rf', `./docs/*`, `./cloud-reporting`);
          
         console.log('copied');
        }
    
   
})
