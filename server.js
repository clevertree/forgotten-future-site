const express = require('express');
const clevertreeCMS = require('clevertree-cms');

// Create Express
const app = express();


// Add Your App
app.use('/concept', express.static(__dirname + '/concept'));
app.use('/game', express.static(__dirname + '/game'));
app.use('/assets', express.static(__dirname + '/assets'));



// Add CMS middleware
app.use(clevertreeCMS.getMiddleware({
    database: {
        // host: 'localhost',
        // user: 'cms_user',
        // password: 'cms_pass',
        database: 'ffga_me_cms'
    },
    server: {
        httpPort: 8092,
        sslEnable: false
        // sslPort: 8443,
    },
    mail: {
        client: {
            auth: {
                user: "mail@static",
                pass: "mailmail"
            },
            host: "mail.static",
            port: 587
        }
    }
}));



// Launch your server
const httpPort = 8092;
app.listen(httpPort, function() {
    console.log('Example app listening on port: ' + httpPort);
});
