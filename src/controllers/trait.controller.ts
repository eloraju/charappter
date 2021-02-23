import {Collection} from "mongodb";
import {Trait, TraitValidators} from "../db/models/trait";
import {CollectionController} from "./collection.controller";

export class TraitController extends CollectionController<Trait>{
    constructor(db: Collection<Trait>) {
        super(db, TraitValidators, 'TraitController');
    }

    // Space for custom functions
}
