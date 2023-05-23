import data from '../dataFeed.json';
import { PersonData } from '../shared/models/person-data.interface';
import cleanseB2Object from '../shared/utils';

export function getData(): PersonData[] {
  return data.map(val => cleanseB2Object(val)) as PersonData[];
}
