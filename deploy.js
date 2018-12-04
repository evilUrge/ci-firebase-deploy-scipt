const fs = require('fs');
const token = fs.readFileSync(`${__dirname}/.firebase-token`);
const firebaseSiteConf = Object.keys(require('./firebase.json'));
const functionName = require('./package').name;
const projectName = (JSON.parse(fs.readFileSync(`${__dirname}/.firebaserc`, 'utf8'))).projects[process.env.NODE_ENV];
/**
 * FireBase Deployment script
 * FOR CI USE ONLY!
 */

console.log('Deploying to Firebase... please wait.');

require('firebase-tools').deploy((() => {
    let fbServices = ['functions', 'hosting', 'database'];

    let baseConf = {
        project: projectName,
        token: token,
        cwd: __dirname,
    };

    for (let serviceIndex in fbServices) {
        let currentService = fbServices[serviceIndex];
        if (firebaseSiteConf.includes(currentService)) {
            if (Object.keys(baseConf).includes('only')) {
                delete baseConf['only'];
                break;
            } else {
                baseConf['only'] = `${currentService}:${functionName}`;
            }
        }
    }
    return baseConf;
})()).then(() => {
    console.log(`Your project ${projectName} has been deployed`);
    return true;
}).catch((err) => {
    console.warn(`error has occurred! - ${err}`);
});
