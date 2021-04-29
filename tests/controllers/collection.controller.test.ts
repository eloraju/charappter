import { CollectionController } from '../../src/controllers/collection.controller';
import { DBDocument, ObjectIdValidator } from '../../src/db/models/shared';
import joi from 'joi';
import { Collection } from 'mongodb';
import { DB } from '../../src/db/database';
import config from '../../src/config';

interface TestInterface extends DBDocument {
    value: string;
    optional: number | null;
}

export const AddTestValidator = joi.object({
    value: joi.string().required(),
    optional: joi.number().allow(null)
});

export const EditTestValidator = joi.object({
    _id: ObjectIdValidator.required(),
    value: joi.string(),
    optional: joi.number().allow(null)
});

class TestController extends CollectionController<TestInterface> {
    constructor(db: Collection<TestInterface>) {
        super(db, AddTestValidator, EditTestValidator, 'TestController');
    }
}

describe('Controller base class tests', () => {
    let db: DB;
    let collection: Collection<TestInterface>;
    let controller: TestController;
    beforeAll(async () => {
        // Open DB connectio and create the test collection
        db = await DB.instance(config.get('db'));
        collection = db.getDatabaseObject().collection<TestInterface>('test');
        controller = new TestController(collection);
    });

    afterEach(async () => {
        await collection.deleteMany({});
    });

    afterAll(async () => {
        DB.closeDB();
    });

    describe('Insert/Update/Remove', () => {
        test('Should succesfully insert a document', async () => {
            const res = await controller.add({ value: 'test', optional: 123 });
            expect(res).toHaveProperty('created');
            expect(res).toHaveProperty('updated');
            expect(res).toHaveProperty('_id');
        });

        test('Should succesfully update a document', async () => {
            const res = await controller.add({ value: 'test', optional: 123 });
            const newValues = {
                _id: res._id,
                value: 'new value',
                optional: null
            };
            const updateRes = await controller.edit(newValues);
            expect(updateRes.updated).not.toBe(res.updated);
            expect(updateRes.value).toBe('new value');
        });

        test('Should succesfully remove a document', async () => {
            const res = await controller.add({ value: 'test', optional: 123 });
            const remove = await controller.remove(res._id);
            const removeRes = (await collection.findOne({
                _id: res._id
            })) as TestInterface;

            expect(remove).toBe(true);
            expect(removeRes.removed).toBe(true);
        });

        test('Should succesfully list multiple documents', async () => {
            await controller.add({ value: 'test1', optional: 123 });
            await controller.add({ value: 'test2', optional: 123 });
            await controller.add({ value: 'test3', optional: 123 });
            await controller.add({ value: 'test4', optional: 123 });

            const res = await controller.all();
            expect(res).toHaveLength(4);
        });

        test('Should only list documents with "removed" set as false', async () => {
            await controller.add({ value: 'test1', optional: 123 });
            await controller.add({ value: 'test2', optional: 123 });
            await controller.add({ value: 'test3', optional: 123 });
            const remove = await controller.add({
                value: 'test4',
                optional: 123
            });
            await controller.remove(remove._id);

            const res = await controller.all();
            expect(res).toHaveLength(3);
        });
    });
});
