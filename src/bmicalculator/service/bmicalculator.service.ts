import logger from '../../shared/logger';
import { PersonData } from '../../shared/models/person-data.interface';
import { BMIResultModel } from '../dataobject/bmi-result.model';
import { BMICategory } from '../model/bmi-category.enum';
import { BMIResult } from '../model/bmi-result';
import { HealthRisk } from '../model/health-risk.enum';

export function getBMIResult(bmi: number, id: number): BMIResult {
  if (bmi <= 18.4) {
    return { id, bmi, category: BMICategory.Underweight, healthRisk: HealthRisk.MalnutritionRisk };
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return { id, bmi, category: BMICategory.Normalweight, healthRisk: HealthRisk.LowRisk };
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return { id, bmi, category: BMICategory.Overweight, healthRisk: HealthRisk.EnhancedRisk };
  }
  if (bmi >= 30 && bmi <= 34.9) {
    return { id, bmi, category: BMICategory.ModeratelyObese, healthRisk: HealthRisk.MediumRisk };
  }
  if (bmi >= 35 && bmi <= 39.9) {
    return { id, bmi, category: BMICategory.SeverelyObese, healthRisk: HealthRisk.HighRisk };
  }
  if (bmi >= 40) {
    return { id, bmi, category: BMICategory.VerySeverelyObese, healthRisk: HealthRisk.VeryHighRisk };
  }
}

export function calculateBMI(personData: PersonData): number {
  const heightM = personData.heightCm / 100;
  return +(personData.weightKg / (heightM * heightM)).toFixed(2);
}

export async function upsert(bmiResults: BMIResult[]) {
  try {
    const result = await BMIResultModel.bulkWrite(
      bmiResults.map(bmiResult => ({
        updateOne: {
          filter: { id: bmiResult.id },
          update: bmiResult,
          upsert: true
        }
      }))
    );
    return result;
  } catch (err) {
    logger.error(err);
  }
}

export async function findByCategory(bmiCategory: BMICategory) {
  try {
    const bmiResults = await BMIResultModel.find({ category: bmiCategory }).exec();
    return bmiResults;
  } catch (err) {
    logger.error(err);
  }
}
