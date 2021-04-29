import { DBDocument, ModelValidators, ObjectIdValidator } from './shared.model';
import joi from 'joi';
import { ObjectId } from 'mongodb';

export enum TraitType {
    Attribute = 'attribute',
    Skill = 'skill',
    Feat = 'feat',
    Pool = 'pool'
}

export interface Trait extends DBDocument {
    _id: ObjectId;
    name: string;
    description: string | null;
    type: TraitType;
}

export const TraitValidator = joi.object({
    _id: ObjectIdValidator.required(),
    name: joi.string().required(),
    description: joi.string().allow(null),
    type: joi
        .string()
        .allow(...Object.values(TraitType))
        .required()
});

export const AddTraitValidator = joi.object({
    name: joi.string().required(),
    description: joi.string().allow(null),
    type: joi
        .string()
        .allow(...Object.values(TraitType))
        .required()
});

export const EditTraitValidator = joi.object({
    _id: ObjectIdValidator.required(),
    name: joi.string(),
    description: joi.string().allow(null),
    type: joi.string().allow(...Object.values(TraitType))
});

export const TraitValidators: ModelValidators = {
    main: TraitValidator,
    add: AddTraitValidator,
    edit: EditTraitValidator
};
