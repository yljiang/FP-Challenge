# Fresh Prints Tech Challenge!!!!!!!!!!!

## Introduction
Hello fellow coders. Welcome to the Fresh Prints coding challenge!
Here, we will give you what you need to get started.

### Getting set up
1. Install node
2. git clone git@bitbucket.org:freshprints/fresh-prints-tech-challenge.git

### To start the application
1. Run "npm install" to download dependencies
2. Run "npm start" to start server

### Complete the following files to finish the challenge
1. public/js/controller.js
2. routes/api.js
	You need to complete the two API end points and the Inventory check function.
3. views/index.jade
	You only need one view for this project. Insert HTML code where the comment tag is located.
	Bonus points if you use jade code for this project instead of html.
4. public/css/app.css
	A bootstrap CDN is also imported by default

## We included a few tools to help you
### MYSQL driver
We have set up a read only connection to a MYSQL database containing apparel and printing cost information.
To query the mysql database, use the connection object that is imported in api.js.
Here is an example:

    db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('The solution is: ', rows[0].solution);
    });

More examples can be found here: https://github.com/felixge/node-mysql

### Inventory Check API Documentation
https://docs.google.com/document/d/12ELHIBwOnSleMhXTwceuviE9MY4zQ-VZS2ymO8F0Rpo/edit#

## Acknowledgements
The following seed is forked from https://github.com/btford/angular-express-seed and modified.
Outdated imports were updated for simplicity.