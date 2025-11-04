import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { User as UserType } from "../types/Type";

export interface UserDocument extends Document<Types.ObjectId>, UserType {
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<UserDocument, Model<UserDocument>> = new Schema<
  UserDocument,
  Model<UserDocument>
>(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    name: {
      type: String,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    avatarUrl: String,
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
