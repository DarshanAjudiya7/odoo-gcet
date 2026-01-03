import { Schema, model, models, Types } from "mongoose";

export type UserRole = "admin" | "employee";

export interface IUser {
  clerkId: string;
  employeeId: string;
  role: UserRole;

  name: string;
  email: string;
  phone?: string;

  department?: Types.ObjectId;
  jobTitle?: string;

  salary?: number;
  profileImage?: string;

  isActive: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    employeeId: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", "employee"], required: true },

    name: { type: String, required: true },
    email: { type: String, required: true },

    phone: String,
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    jobTitle: String,

    salary: Number,
    profileImage: String,

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
