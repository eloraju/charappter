import { Request, Response, Router } from 'express';
import { createControllers } from '../controllers/controllers';
import { DB } from '../db/database';

export function apiV1(db: DB): Router {
    const router = Router();
    const { traits, rules, items, characters } = createControllers(db);

    router.post('/v1', async (req: Request, res: Response) => {
        res.send('Very nice');
    });

    return router;
}
