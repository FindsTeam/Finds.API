require('dotenv').config();

const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { formatUnauthorizedErrorMiddleware } = require('./app/services/auth');
const routesApi = require('./app/routes/index');
const database = require('./app/mongoose');

database.connect();

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routesApi);

app.use(formatUnauthorizedErrorMiddleware);

server.listen(process.env.PORT);
