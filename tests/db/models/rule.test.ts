import {Rule, RuleValidator} from '../../../src/db/models/rule';
import {ObjectId} from 'mongodb';

describe('Rule model tests', ()=>{
    describe('Rule validation tests', ()=>{
        test('Should pass validation', async () => {
            const testTrait: Rule = {
                _id: new ObjectId().toHexString(),
                target: new ObjectId().toHexString(),
                source: new ObjectId().toHexString(),
                multiplier: 0.5,
                function: null,
            }

            const result = RuleValidator.validate(testTrait);

            expect(result.error).toBeFalsy();
        });
    });
});

