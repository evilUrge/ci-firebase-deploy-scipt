# ![Firebase logo](https://www.shareicon.net/data/256x256/2016/07/08/117548_google_512x512.png "Firebase") Deploy Firebase app in CI

Prerequisites:
-------------
* Firebase CI Token(see below for howto)
* NODE_ENV that's equal to your firebase environment
* Docker Engine (To exec and deploy the deployment script)

##### Generate Firebase token for your CI.

1. Run `firebase login:ci` and authenticate with your Firebase project
2. Copy the token and paste it into `.firebase-token` file.

How to add to my project
-------------
* Copy the folder root to your project root.
* Install firebase-tools as part of the project dependencies `npm install firebase-tools --save`

Configure
-------------
1. Fill `.firebaserc` with your Firebase projects env strings(same name as the Firebase project)
2. This folder is an example for ONLY firebase functions deployment. therefore make sure to overwrite the `firebase.json` file with your configuration.
###### When you execute locally please use NODE_ENV param to specify what environment you want to deploy to

Execute and add to your CI of choice
-------------
To make life a bit easier; I've included a Dockerfile that use alpine slim image with node v8.
all it does is execute the deploy script with the NODE_ENV param for the relvant enviorment(so once again - don't forget to set it up as well in your CI as part of the perquisites)
