import {Collection} from "mongodb";
import {CollectionController} from "../db/models/shared";
import {AddTraitValidator, EditTraitValidator, Trait} from "../db/models/trait";

export class TraitController extends CollectionController<Trait>{
    constructor(db: Collection<Trait>) {
        super(db, AddTraitValidator, EditTraitValidator, 'TraitController');
    }
}
