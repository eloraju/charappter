import {Router} from 'express';
import {TraitController} from '../../../controllers/trait.controller';
import {DB} from '../../../db/database';

const traitRouter = Router();
traitRouter.use('/', (req, res) =>{
    const collection = (req.app.locals.db as DB).traits;
    const controller = new TraitController(collection);
    req.app.locals.controller = controller;
    res.send("yolo");;
})

// Skill routes
traitRouter.route('/skill/')
traitRouter.route('/skill/:skillId')

// Attribute routes
traitRouter.route('/attribute')
    .post()

// Feat routes
traitRouter.route('/feat')

// Point pool routes
traitRouter.route('/pool')

export default traitRouter;
