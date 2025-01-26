import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'female',
    },
    weight: {
      type: Number,
      default: 0.0,
      min: 0.0,
    },
    sportTime: {
      type: Number,
      default: 0.0,
      min: 0.0,
    },
    waterNorm: {
      type: Number,
      default: 1.5,
      min: 0.05,
      max: 5.0,
    },
    avatarURL: {
      type: String,
      default:
        'https://res.cloudinary.com/dirtbd4yk/image/upload/v1737918880/defaultUser_xhjnc5.png',
      //'https://res.cloudinary.com/dirtbd4yk/image/upload/v1717687717/def-avatar-light_1x_fkwy6u.jpg'
    },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
