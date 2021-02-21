import bodyParser from 'body-parser';
import express from 'express';
import {Charappter} from './app';
import config from './config';
import {DB} from './db/database'

DB.instance(config.get('db')).then( db => {
    console.log('Database connected')
    const app = new Charappter(db.collections());
    app.serve();
});
