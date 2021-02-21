import {DB} from '../../src/db/database';
import config from './../../src/config';
const dbConf = config.get('db');


describe('Database class tests', ()=> {
    let db:DB;

    beforeAll(async ()=>{
        db = await DB.instance(dbConf);
    })

    afterAll(()=>{
        DB.closeDB();
    })

    test('Opens a Mongo connection succesfully', async () => {
        expect(db).toBeTruthy();
        expect(DB.connected).toBe(true);
    });

    describe('Test that the collections are working', () =>{

        test(`Should ret
            urn "traits" collections`, async () => {
            const collection = "traits";
            // Hack to prevent the compiler from 
            // cyring about the returned valued
            // possibly being null...
            const traits:any = db.traits;
            expect(traits).not.toBe(null);
            expect(traits.collectionName).toBe(collection);
        });

        test(`Should return "rules" collections`, async () => {
            const collection = "rules";
            const rules: any = db.rules;
            expect(rules).not.toBe(null);
            expect(rules.collectionName).toBe(collection);
        });
    });

});
