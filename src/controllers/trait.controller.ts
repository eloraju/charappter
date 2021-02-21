import {Collection} from "mongodb";
import {CollectionController} from "../db/models/shared";
import {CreateTraitValidator, Trait, TraitValidator} from "../db/models/trait";

export class TraitController extends CollectionController<Trait>{
    constructor(db: Collection<Trait>) {
        super(db, CreateTraitValidator, TraitValidator, 'TraitController');
    }
}
