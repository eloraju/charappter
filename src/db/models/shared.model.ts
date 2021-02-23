import joi, {CustomHelpers} from 'joi'
import {ObjectId} from 'mongodb'

export const ObjectIdValidator = joi.custom((id: ObjectId, helpers: CustomHelpers) => {
    if (!(id instanceof ObjectId)) { return helpers.error('any.custom.0'); }
    const idAsString = id.toHexString();

    const result = /^[a-f0-9]{24}$/.exec(idAsString);

    if(!result) {
        return helpers.error('any.custom.1')
    }

    return id;
}).messages({
    'any.custom.0':'Provided value is not an ObjectId',
    'any.custom.1':'input is not a valid ObjectId'
});

export interface BelongsToGame {
    game: ObjectId;
}

export interface DBDocument {
    _id: ObjectId;
    created?: number;
    updated?: number;
    removed?: boolean;
//    creator: ObjectId;
}

export interface ModelValidators {
    main: joi.Schema;
    add: joi.Schema;
    edit: joi.Schema;
}
