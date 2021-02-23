import bodyParser from 'body-parser';
import express from 'express';
import config from './config';
import {createControllers} from './controllers/controllers';
import {DB} from './db/database'

DB.instance(config.get('db')).then( db => {
    console.log('Database connected')
    const serverConf = config.get('server');
    const app = express();
    app.use(bodyParser.json());

    const { traits, rules, items, characters } = createControllers(db);

    app.listen(serverConf.port, () => {
        console.log(`Server running at port ${serverConf.port}`);
    });
});
