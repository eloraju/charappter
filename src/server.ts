import express from 'express';
import config from './config';
import { DB } from './db/database';
import { apiV1 } from './v1/api';

DB.instance(config.get('db')).then((db: DB) => {
    console.log('Database connected');
    const serverConf = config.get('server');
    const app = express();
    app.use(express.json());

    app.use('/api', apiV1(db));

    app.listen(serverConf.port, () => {
        console.log(`Server running at port ${serverConf.port}`);
    });
});
