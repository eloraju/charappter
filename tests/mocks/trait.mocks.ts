import { ObjectId } from 'bson';
import { Trait, TraitType } from '../../src/db/models/trait.model';

export const mockTraits: Trait[] = [
  {
    _id: new ObjectId(),
    name: 'Test skill',
    description: null,
    type: TraitType.Skill
  },
  {
    _id: new ObjectId(),
    name: 'Test attribute',
    description: null,
    type: TraitType.Attribute
  },
  {
    _id: new ObjectId(),
    name: 'Test pool',
    description: null,
    type: TraitType.Pool
  },
  {
    _id: new ObjectId(),
    name: 'Test skill',
    description: null,
    type: TraitType.Feat
  }
];
