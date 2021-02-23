
import {DBDocument, ModelValidators, ObjectIdStringValidator, ObjectIdValidator, RelationNumberValidator} from './shared.model';
import joi from 'joi';

export interface Character extends DBDocument{
    name: string;
    traits: {[traidId: string]: number},
    items: {[traidId: string]: number}
}


export const CharacterValidator = joi.object({
    _id: ObjectIdValidator.required(),
    name: joi.string().required,
    traits: RelationNumberValidator.required(),
    items: RelationNumberValidator.required(),
});

export const AddCharacterValidator = joi.object({
    _id: ObjectIdValidator,
    name: joi.string().required(),
    traits: RelationNumberValidator.required(),
    items: RelationNumberValidator.required(),
});

export const EditCharacterValidator = joi.object({
    _id: ObjectIdValidator.required(),
    name: joi.string(),
    traits: RelationNumberValidator,
    items: RelationNumberValidator,
});

export const CharacterValidators: ModelValidators = {
    main: CharacterValidator,
    add: AddCharacterValidator,
    edit: EditCharacterValidator
}
