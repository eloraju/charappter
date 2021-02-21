import {Router} from 'express';
import traitRouter from './trait.route';

const gameRouter = Router();
// Trait routes
// Traits are always bound to a game so there's
// no point in tryign to query them by themselves

//gameRouter.use('/', traitRouter);
//gameRouter.use('/:gameId', traitRouter);
//gameRouter.use('/:gameId/character', traitRouter);
//gameRouter.use('/:gameId/item', traitRouter);
gameRouter.use('/:gameId/trait', traitRouter);

export default gameRouter;
