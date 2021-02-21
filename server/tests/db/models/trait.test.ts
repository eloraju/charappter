import {Trait, TraitValidator, TraitType} from '../../../src/db/models/trait';
import {ObjectId} from 'mongodb';

describe('Trait model tests', ()=>{
    describe('Trait validation tests', ()=>{
        test('Should pass validation validate', async () => {
            const testTrait: Trait = {
                _id: new ObjectId().toHexString(),
                name: 'TestTrait',
                description: 'Just some text',
                type: TraitType.Attribute
            }

            const result = TraitValidator.validate(testTrait);

            expect(result.error).toBeFalsy();
        });

        test('Should allow "null" for description', async () => {
            const testTrait: Trait = {
                _id: new ObjectId().toHexString(),
                name: 'TestTrait',
                description: null,
                type: TraitType.Attribute
            }

            const result = TraitValidator.validate(testTrait);

            expect(result.error).toBeFalsy();
        });
    });
})
