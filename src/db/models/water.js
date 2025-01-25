import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
    volume: {
      type: Number,
      required: true,
      min: 50,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true, versionKey: false, collection: 'water' },
);
export const WaterCollection = model('water', waterSchema);
