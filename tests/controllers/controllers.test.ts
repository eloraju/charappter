import {DB} from '../../src/db/database';
import config from '../../src/config';
import {createControllers} from '../../src/controllers/controllers';

describe('Test that the controller creation function works', () => {
    let db: DB;
    beforeAll(async ()=>{
        db = await DB.instance(config.get('db'));
    });

    afterAll(async ()=>{
        DB.closeDB();
    });

    test('Should create a controllers', () => {
        const {traits, items, rules, characters} = createControllers(db);

        expect(traits).toBeTruthy();
        expect(items).toBeTruthy();
        expect(rules).toBeTruthy();
        expect(characters).toBeTruthy();
    });
});
