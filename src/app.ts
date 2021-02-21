import bodyParser = require('body-parser');
import express from 'express';
import v1Router from './routes/api/v1/v1.route';
import config from './config';
import {CharappterCollections} from './db/database';

// everything is public here to make it easier to test this whole thing...
export class Charappter {
    serverConf = config.get('server');
    app = express();

    constructor(
        public collectios: CharappterCollections,
    ) {
        this.app.use(bodyParser.json());
        this.app.use('/api/v1', v1Router);

        this.app.post("/", (_, res) => {
            res.send('Hi POST!')
        });

        this.app.get("/", (_, res) => {
            res.send('Hi GET!');
        });
        console.log(Object.keys(this.collectios))
    }

    postServeHook(){
        console.log(`Server now listening on ${this.serverConf.host}:${this.serverConf.port}`)
    }

    serve() {
        this.app.listen(this.serverConf.port, this.postServeHook.bind(this))
    }
}
