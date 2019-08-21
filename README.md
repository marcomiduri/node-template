## Installation

1. You need `Node.js` (at least 10.x version) installed on your machine, if you don't have it, you should install it -
download [link](https://nodejs.org/en/download/)
2. [Clone the project from github](https://github.com/marcomiduri/node-template.git) or
[download the archive](https://github.com/marcomiduri/node-template.git)
3. `cd` to your downloaded Argon app
4. Install necessary dependencies:
    - **Via node `npm` package manager** - Run `npm install` on the project root
    - **Via `yarn` package manager** - Run `yarn install` on the project root

## Configuration for Mongoose database

##### Via Docker

1. Install **Docker** on your machine
2. Run `docker-compose up -d` in a terminal on the project root. This will one container:
    - database(Mongoose) container;

##### Via another chosen solution.

1. Install your **Mongoose** database
3. Change connection configuration, from your root `cd` to `env-files` folder and change the following configurations
with your own:

###### **For Mongoose connection:**
1. Database connection via URL
```bash
DATABASE_URL=mongodb://localhost:27017/node-template
# Example: DATABASE_URL=mongodb://<username>:<password>@<host>:<port>/<database>?options...
```

## Migrations and seeds

1. To create a default user, run: `npm run mongoose-init` or `yarn mongoose-init` if you are using `yarn` as the
default package manager

## Run the application

1. For starting the application, the following script (defined in `package.json` under `scripts`) must be called:
    - via **npm**: `npm run start`;
    - via **yarn**: `yarn start`;


## Usage

Register a user or login using **admin@argon.com**:**secret** and start testing the preset (make sure to run the migrations and seeds for these credentials to be available).

Besides the dashboard and the auth pages this preset also has an edit profile page.
**NOTE**: _Keep in mind that all available features can be viewed once you login using the credentials provided above
or by registering your own user._

## Controllers

In order to see the available features `cd` into `controllers` folder, and you will then find a folder for each of the
available features, mostly each folder containing:

- A `routes.js` file that usually contains the `GET` and `POST` requests, for example, the profile router looks like this:

```javascript
const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const updateUserInfo = require('./commands/update-user-info');
const { loadPage } = require('./commands/profile');

module.exports = (router, middlewares = []) => {
  router.get('/profile', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));
  router.post('/update-profile-info', wrap(requestBodyValidation), wrap(updateUserInfo));

  return router;
};
```

- A `controllers` folder where you can find all feature functionality functions, for example the login template rendering
which looks like this:

```javascript
function loadPage(req, res) {
  debug('login:loadPage', req, res);
  res.render('pages/login');
}
```
- A `constants.js` file, to store all your static variables, for eg:

```
const USERNAME_PASSWORD_COMBINATION_ERROR = 'These credentials do not match our records.';
const INTERNAL_SERVER_ERROR = 'Something went wrong! Please try again.';
```

All feature routes are mounted in `routes/index.js` from the project root.

## For the Front-end side:

##### Templates

- You can find all the templates in `views` folder where you will find:
1. The `layout.ejs` file, the main template layout.
2. A `pages` folder with all the page templates
3. A `partials` folder with the common components (header, footer, sidebar)
