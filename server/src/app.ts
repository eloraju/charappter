import bodyParser = require('body-parser');
import express from 'express';

const app = express();

app.use(bodyParser.json());

app.post("/", (_, res) => {
    res.send('Hi POST!')
});

app.get("/", (_, res) => {
    res.send('Hi GET!');
});

export default app;
