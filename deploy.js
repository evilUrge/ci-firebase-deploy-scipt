let fs = require('fs');
let token = fs.readFileSync(`${__dirname}/.firebase-token`);
let firebaseSiteConf = Object.keys(require('./firebase.json'));
let projectName = (JSON.parse(fs.readFileSync(`${__dirname}/.firebaserc`, 'utf8'))).projects[process.env.NODE_ENV];
/**
* FireBase Deployment script
 * FOR CI USE ONLY!
 */

console.log('Deploying to Firebase... please wait.');
require('firebase-tools').deploy({
    only_functions: firebaseSiteConf.length === 1 && firebaseSiteConf[0] === 'functions',
    only_hosting: firebaseSiteConf.length === 1 && firebaseSiteConf[0] === 'hosting',
    only_database: firebaseSiteConf.length === 1 && firebaseSiteConf[0] === 'database',
    project: projectName,
    token: token,
    cwd: __dirname,
}).then(() => {
    console.log(`Your project ${projectName} has been deployed`);
    return true
}).catch((err) => {
    console.warn(`error has occurred! - ${err}`);
});
