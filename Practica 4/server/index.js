const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./db/ConnectDB');
const router = require('./routes/DBOperRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

let pool;

(async () => {
    pool = await ConnectDB();

    app.use((req, res, next) => {
        req.pool = pool;
        next();
    });

    app.use('/', router);

    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
})();
