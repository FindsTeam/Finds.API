<p align="center"> 
  <a href="https://codeclimate.com/github/GitStearis/freebee-api/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/f02a456a6442de50e7ad/maintainability" />
  </a>
  <a class="badge-align" href="https://www.codacy.com/app/GitStearis/freebee-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GitStearis/freebee-api&amp;utm_campaign=Badge_Grade">
    <img src="https://api.codacy.com/project/badge/Grade/ac00fde54e5242dbb13602483384c74c"/>
  </a>
</p>

<p align="center"> 
  <img src='https://drive.google.com/uc?id=1albVAA6GrHQaG0EvN3a1WFCs9irSv5Lk' alt='Freebee logo' width="200" />
</p>

# Freebee

It's a map based web-application designed to navigate over free facilities of city (simply put, *freebies*).

* [Small VK public page](https://vk.com/freebeeapp);
* [Freebee at Social Weekend Hackathon](http://telegra.ph/Social-Weekend-Hackathon--kak-ehto-bylo-02-26).

## Getting started

Clone project to your computer.

```
$ git clone https://github.com/FreebeeTeam/freebee-api.git
```

### Prerequisites

To start with Freebee API, you should have [Node](https://nodejs.org/en/download/package-manager/) installed.

### Installing

Install all dependencies.

```
$ npm install
```

To launch Freebee API you should create `.env` file in a root directory. File should contain:

```
PORT = 4000
MONGODB_CONNECTION =
MONGO_DB_NAME =

HERE_ROUTE_API =
HERE_APP_ID =
HERE_APP_CODE =

AUTH0_DOMAIN =
AUTH0_API_IDENTIFIER =
AUTH0_CLIENT_ID =
```

* `MONGODB_CONNECTION` - a MongoDB [connection string](https://docs.mongodb.com/manual/reference/connection-string/) with credentials;
* `AUTH0_DOMAIN` - Auth0's server location, could be found [here](https://manage.auth0.com/#/applications);
* `AUTH0_API_IDENTIFIER` - friendly name for app API, could be changed in [APIs](https://manage.auth0.com/#/apis) tab of Auth0 Dashboard.

To run server on localhost type  `npm start`  in root folder.

```
$ npm start
```

## Deployment

To deploy with Heroku, visit [official guide page](https://devcenter.heroku.com/articles/git).

Briefly:

```
$ heroku login
Enter your Heroku credentials.
$ heroku create
$ git push heroku master
```

Ensure the app is running.

```
heroku ps:scale web=1
heroku open
```

## Built With

- [Node.js](https://github.com/nodejs/node)  - JavaScript runtime for server;
- [npm](https://github.com/npm/npm)  - Package manager for JavaScript;
- [Express.js](https://github.com/expressjs/express)  - Framework for Node.js.

### Deployment

- [Heroku](https://www.heroku.com/home)  - Deployment platform for testing needs.

### Database

- [MongoDB](https://www.mongodb.com/)  - NoSQL Database;
- [Mongoose](http://mongoosejs.com/)  - ODM for MongoDB.

## Hints

Some advices that can save your time :bulb:

* Your project should provide a [Procfile](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile) when you deploy to Heroku.

## Active team

* **Егор Пуйша** - [GitStearis](https://github.com/GitStearis) - Author, Full-stack Development;
* **Артем Дадыченко** - [ArtemDadychenko](https://github.com/ArtemDadychenko) - Front-end Developer;
* **Егор Сулицкий** - Marketer.

### Inactive people & former participants

* **Даниил Чернышев** - [des1nteresado](https://github.com/des1nteresado) - Back-end Developer;
* **Анастасия Бируля** - Designer.

