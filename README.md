# Meteor on FHIR
For my Masters of Science in Biomedical Informatics, we are required to create a Capstone Project.  So I decided to write a Health Information Exchange infrastructure.  The technical infrastructure uses MongoDB (a modern hierarchical database, similar to the MUMPS/Cache database what Epic uses), a full-stack isomorphic javascript framework called Meteor, and Facebook's user interface layer React.  The HIE uses a wordpress business model, and is intended to be a distributed and federated peer-to-peer network.  We use HL7 Fast Healthcare Interoperability Resources (FHIR) for data exchange and interoperability.  

[![CircleCI](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master)  


#### A. Installation  

```sh
# get the application
git clone http://github.com/clinical-meteor/meteor-on-fhir
cd meteor-on-fhir/webapp

# #install dependencies
# meteor npm install --save jquery bootstrap react react-dom react-router react-bootstrap react-komposer react-router-bootstrap faker jquery-validation react-addons-css-transition-group react-addons-pure-render-mixin react-mixin faker react-highcharts eslint-plugin-react eslint-plugin-meteor eslint-config-eslint react-scroll-box

# install the app
meteor npm install
```


#### B. Running Local

```sh
## Initialize with FHIR test data
INITIALIZE=true Patients=true Practitioners=true meteor

## general development
NODE_ENV=test INITIALIZE=true Patients=true Practitioners=true meteor --settings settings.dev.json

## general development  for desktop app
npm run desktop
```


#### C. Testing    
You may need to install [Java SDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run the latest version of Selenium.

```sh
## install test tools
# meteor npm install nightwatch starrynight chromedriver phantomjs-prebuilt selenium-standalone-jar
meteor npm install

## run validation tests (using nightwatch)
meteor npm run-script nightwatch

## running verfication test coverage (using mocha)
COVERAGE_APP_FOLDER=/Users/abigailwatson/Code/GlassUI/fire-demo/ meteor npm run-script coverage
# http://localhost:3000/coverage
```

#### D. Theme and Remove Licensed Media Assets
Edit the `settings.dev.json` file, and update:
```
{
  "public": {
    "title": "Rainbow's End Nursing Home Health Exchange",
    "theme": {
      "showVideoBackground": false
    }
  },
  "private": {
    "practitionerAccessCode": "hippocrates",
    "sysadminAccessCode": "rootaccess"
  }
}
```

Run the script to remove restricted media assets:
```
scripts/remove_restricted_media_assets.sh
```

#### E. Deploy to Production  

```sh
TIMEOUT_SCALE_FACTOR=10 DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy meteor-on-fhir.meteorapp.com --settings settings.dev.json
```   


#### F. Mobile Build   

```sh
# development
# this can be tricky, because http://localhost:3000 may need to be a local IP address
# you may need to use `ifconfig` to find that address
# beware network isolation, and make sure your phone and workstation are on the same network
NODE_ENV=dev meteor run ios-device --mobile-server http://localhost:3000 --settings settings.dev.json

# production
# we need to specify the production server
NODE_ENV=dev meteor run ios-device --mobile-server http://meteor-on-fhir.meteorapp.com --settings settings.dev.json
```    

#### G. Publish to Testflight  

- [ ] Update version/build numbers
- [ ] Set Deployment Target to iOS v10.0
- [ ] Set Team Signing Certificate
- [ ] Build to local device
- [ ] Product > Clean
- [ ] Set Provision Profile
- [ ] Set Signing Profile
- [ ] Product > Archive > Validate
- [ ] Product > Archive > Upload to App Store


#### F. Desktop Build   

```sh
# run the app locally, as if you were doing a mobile build
# (you may be able to just use the running mobile build server)
NODE_ENV=dev meteor --mobile-server http://localhost:3000 --settings settings.dev.json

# then run the desktop build
npm run desktop

# or try the shortcut script
 meteor npm run-script desktop
```    

#### Licensing

Abigail Watson
Artistic License 2.0

The code is free, but be careful about media assets, some of which are not publicly licensed.  
