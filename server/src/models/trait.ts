import joi from 'joi';

export enum TraitType {
    Attribute = 'attribute',
    Skill = 'skill',
    Feat = 'feat',
    Point = 'point'
}

export interface Trait extends DBDocument{
    _id?: string;
    name: string;
    description: string;
    type: TraitType;
}

export const TraitValidator = joi.object({
    name: joi.string().required(),
    // Requires a custom validation function
    // to check whether this abreviation can be used
    description: joi.string().allow(null),
    type: joi.allow(Object.values(TraitType)).required()
})

//import mongoose, { Schema, Document } from 'mongoose';
//
//export enum TraitType {
//    Attribute = 'attribute',
//    Skill = 'skill',
//    Feat = 'feat',
//    Point = 'poin'
//}
//
//export interface ITrait extends Document {
//    name: string;
//    description: string;
//    type: TraitType;
//}
//
//const TraitSchema: Schema = new Schema({
//    name: { type: String, required: true, unique: true },
//    description: { type:String },
//    type: { type: String, enum: Object.values(TraitType) }
//});
//
//export default mongoose.model<ITrait>('Trait', TraitSchema);
