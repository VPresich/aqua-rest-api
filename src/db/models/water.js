import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    volume: {
      type: Number,
      required: true,
      min: 50,
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
  },
  { timestamps: true, versionKey: false, collection: 'water' },
);
export const WaterCollection = model('water', waterSchema);
