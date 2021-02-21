import joi, {CustomHelpers, Schema} from 'joi'
import {Collection, ObjectId} from 'mongodb'

export const ObjectIdValidator = joi.custom((objectId: ObjectId|string, helpers: CustomHelpers) => {
    const idAsString = objectId instanceof ObjectId ?  objectId.toHexString() : objectId;

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

export abstract class CollectionController<T extends DBDocument> {
    constructor (
        protected db: Collection<T>, 
        private addValidator: Schema,
        private editValidator: Schema,
        private controllerName: string
    ) {
        this.db = db;
    }

    private validate(args: any, validator: Schema) {
        // This will throw if the validation fails.
        // Not 100% sure whether this is a good idea or not
        const res = validator.validate(args);
        if (res.error) {
            this.throwError('InvalidArgumentsError', res.error.message)
        }
    }

    private throwError(error: string, message: string) {
        throw new Error(`[${this.controllerName}] ${error}: ${message}`);
    }

    async add(addArgs: Omit<T, '_id'>): Promise<T> {
        this.validate(addArgs, this.addValidator);

        const newObject: any = {
            ...addArgs,
        }

        const res = await this.db.insertOne(newObject);
        return {
            ...newObject,
            _id: res.insertedId
        };
    }

    async remove(id: string): Promise<boolean> {
        this.validate(id, ObjectIdValidator);
        const query: any = {
                _id: new ObjectId(id)
        }

        const res = await this.db.deleteOne(query);
        return res.deletedCount === 1;
    }

    async edit(editArgs: T): Promise<T> {
        this.validate(editArgs, this.editValidator);
        const query:any = {
            _id: new ObjectId(editArgs._id)
        }
        const toUpdate =await this.db.findOne(query)
        if (!toUpdate) { this.throwError('ObjectNotFound', 'Coulnd not find object to update. Does it exists?') };

        const updateQuery = {
            $set:{
                ...toUpdate,
                ...editArgs
            }
        }

        const result = await this.db.updateOne(query,updateQuery);
        if (result.modifiedCount === 0) { this.throwError('BlackMagicError', 'For some reason update was not successful.')}

        return {...updateQuery.$set};
    }

    async view(id: string): Promise<T>{
        this.validate(id, ObjectIdValidator);
        const query: any = {
            _id: new ObjectId(id),
        }
        const result = await this.db.findOne(query);
        if (!result) { this.throwError('ObjectNotFound', 'Object does not exist')}
        return result as T;
    }

    async all(): Promise<T[]>{
        return this.db.find().toArray();
    }
}
