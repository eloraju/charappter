import joi, {CustomHelpers} from 'joi'
import {ObjectId} from 'mongodb'

export const ObjectIdValidator = joi.custom((id: ObjectId, helpers: CustomHelpers) => {
    if (!(id instanceof ObjectId)) { return helpers.error('Provided value is not an ObjectId'); }
    const idAsString = id.toHexString();

    const result = /^[a-f0-9]{24}$/.exec(idAsString);

    if(!result) {
        return helpers.error('input is not a valid ObjectId')
    }

    return id;
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
