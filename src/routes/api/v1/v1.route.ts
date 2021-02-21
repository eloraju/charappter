import {Router} from 'express';
import gameRouter from './game.route';

const apiRouter = Router();
apiRouter.use('/game', gameRouter)
//apiRouter.route('/login')

export default apiRouter;
