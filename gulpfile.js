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
    
    var changedFileNames = changes.stdout.split('\n');
    console.log('--changedFileNames----' + changedFileNames);
    
    var cloneRepos = [];
    for (var i = 0; i < changedFileNames.length; i++) {
        var curentRootRepo = changedFileNames[i].split('/')[1];
//         if(curentRootRepo !='workflows'){
//             return
//            }
        if (curentRootRepo != undefined && curentRootRepo !='workflows') {
            cloneRepos.push(curentRootRepo);
        }
    }
    
    console.log('--cloneRepos----' + cloneRepos);    
    
    for (var j = 0; j < cloneRepos.length; j++) {
       var gitPath ='https://' + user + ':' + token + `@gitlab.syncfusion.com/essential-studio/ej2-${cloneRepos[j]}-angular-docs`;
        console.log('Clone has been started...!');
        var clone = shelljs.exec('git clone ' + gitPath + ' -b master ' + ' ' + `./gitlapRepo/docs`, {
            silent: false
        });
        if (clone.code !== 0) {
            console.log(clone.stderr);
            done();
            return;
        } else {
            console.log('Clone has been completed...!');
         
        }
    }
   
})
