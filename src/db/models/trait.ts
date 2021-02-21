import {DBDocument, ObjectIdValidator} from './shared';
import joi from 'joi';
import {ObjectId} from 'mongodb';

export enum TraitType {
    Attribute = 'attribute',
    Skill = 'skill',
    Feat = 'feat',
    Point = 'point'
}

export interface Trait extends DBDocument{
    _id: ObjectId,
    name: string;
    description: string|null;
    type: TraitType;
}

export const TraitValidator = joi.object({
    _id: ObjectIdValidator.required(),
    name: joi.string().required(),
    // Requires a custom validation function
    // to check whether this abreviation can be used
    description: joi.string().allow(null),
    type: joi.string().allow(...Object.values(TraitType)).required()
});


export const CreateTraitValidator = joi.object({
    name: joi.string().required(),
    description: joi.string().allow(null),
    type: joi.string().allow(...Object.values(TraitType)).required()
});
