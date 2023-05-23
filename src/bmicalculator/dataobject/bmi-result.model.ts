import mongoose from 'mongoose';
import { BMIResult } from '../model/bmi-result';

interface BMIResultModelInterface extends mongoose.Model<BMIResultDocument> {
  build(bmiResult: BMIResult): BMIResultDocument;
}

interface BMIResultDocument extends mongoose.Document {
  id: number;
  bmi: number;
  category: string;
  healthRisk: string;
}

const bmiResultSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  bmi: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  healthRisk: {
    type: String,
    required: true
  }
});

bmiResultSchema.statics.build = (bmiResult: BMIResult) => {
  return new BMIResultModel(bmiResult);
};

// tslint:disable-next-line: variable-name
const BMIResultModel = mongoose.model<BMIResultDocument, BMIResultModelInterface>('BMIResult', bmiResultSchema);

export { BMIResultModel };
