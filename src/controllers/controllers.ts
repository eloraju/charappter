import {Collection} from 'mongodb';
import {DB} from '../db/database';
import {Character, CharacterValidators} from '../db/models/character.model';
import {Item, ItemValidators} from '../db/models/item.model';
import {Rule, RuleValidators} from '../db/models/rule.model';
import {Trait, TraitValidators} from '../db/models/trait.model';
import {CollectionController} from './collection.controller';

export interface Controllers {
    traits: TraitController,
        rules: RuleController,
        items: ItemController,
        characters: CharacterController
}

export function createControllers(db: DB): Controllers {
    return {
        traits: new TraitController(db.traits),
        rules: new RuleController(db.rules),
        items: new ItemController(db.items),
        characters: new CharacterController(db.characters)
    }
}

// These can be moved to their own files once they grow a bit larger
//
export class TraitController extends CollectionController<Trait>{
    constructor(db: Collection<Trait>) {
        super(db, TraitValidators, 'TraitController');
    }

    // Space for custom functions
}


export class ItemController extends CollectionController<Item>{
    constructor(db: Collection<Item>) {
        super(db, ItemValidators, 'ItemController');
    }

    // Space for custom functions
}

export class RuleController extends CollectionController<Rule>{
    constructor(db: Collection<Rule>) {
        super(db, RuleValidators, 'RuleController');
    }

    // Space for custom functions
}

export class CharacterController extends CollectionController<Character>{
    constructor(db: Collection<Character>) {
        super(db, CharacterValidators, 'CharacterController');
    }

    // Space for custom functions
}
