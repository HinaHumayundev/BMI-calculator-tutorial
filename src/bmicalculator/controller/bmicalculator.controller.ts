import { getData } from '../../services/data-feed.service';
import logger from '../../shared/logger';
import { PersonData } from '../../shared/models/person-data.interface';
import { BMICategory } from '../model/bmi-category.enum';
import { BMIResult } from '../model/bmi-result';
import { calculateBMI, findByCategory, getBMIResult, upsert } from '../service/bmicalculator.service';

function getBMIResults(): BMIResult[] {
  const persons: PersonData[] = getData();
  const bmiResults: BMIResult[] = [];

  // Used simplest for loop for faster processing of records
  for (let index = 0; index < persons.length; index = index + 1) {
    const bmi = calculateBMI(persons[index]);
    const bmiResult = getBMIResult(bmi, index + 1);
    bmiResults.push(bmiResult);
  }
  return bmiResults;
}

export async function readAndUpsertResults() {
  const bmiResults: BMIResult[] = getBMIResults();
  await upsert(bmiResults);
}

export async function countOverweight() {
  try {
    const bmiResults = await findByCategory(BMICategory.Overweight);
    return bmiResults.length;
  } catch (err) {
    logger.error(err);
  }
}
