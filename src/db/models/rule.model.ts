import { DBDocument, ModelValidators, ObjectIdValidator } from './shared.model';
import joi from 'joi';
import { ObjectId } from 'mongodb';

export interface Rule extends DBDocument {
    target: ObjectId;
    source: ObjectId;
    modifier: number;
    function: string | null;
}

export const RuleValidator = joi.object({
    _id: ObjectIdValidator.required(),
    target: ObjectIdValidator.required(),
    source: ObjectIdValidator.required(),
    modifier: joi.number().strict(true).default(0),
    function: joi.string().allow(null)
});

export const AddRuleValidator = joi.object({
    target: ObjectIdValidator.required(),
    source: ObjectIdValidator.required(),
    modifier: joi.number().strict(true).default(0),
    function: joi.string().allow(null)
});

export const EditRuleValidator = joi.object({
    _id: ObjectIdValidator.required(),
    target: ObjectIdValidator,
    source: ObjectIdValidator,
    modifier: joi.number().strict(true).default(0),
    function: joi.string().allow(null)
});

export const RuleValidators: ModelValidators = {
    main: RuleValidator,
    add: AddRuleValidator,
    edit: EditRuleValidator
};
