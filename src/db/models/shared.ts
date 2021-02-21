import joi, {CustomHelpers} from 'joi'
import {ObjectId} from 'mongodb'

export const ObjectIdValidator = joi.custom((objectId: ObjectId|string, helpers: CustomHelpers) => {
    const idAsString = objectId instanceof ObjectId ?  objectId.toHexString() : objectId.toString();

    const result = /^[a-f0-9]{24}$/.exec(idAsString);

    if(!result) {
        return helpers.error('input is not a valid ObjectId')
    }

    return objectId;

})

export interface DBDocument {
    _id: ObjectId;
//    created: number;
//    updated: number;
//    creator: ObjectId;
}
