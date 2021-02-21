import bodyParser from 'body-parser';
import express from 'express';
import config from './config';
import {DB} from './db/database'

const serverConf = config.get('server');
const app = express();


const postServeHook = () => {
    console.log(`Server now listening on ${this.serverConf.host}:${this.serverConf.port}`)
}

DB.instance(config.get('db')).then( db => {
    console.log('Database connected')
    app.listen(serverConf.port, postServeHook)

    app.use(bodyParser.json());
    //app.use('/api/v1', v1Router);
});
