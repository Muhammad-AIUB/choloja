import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    countryCode: string;
    avatar?: string;
    role: "user" | "admin" | "owner";
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            default: "+82",
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin", "owner"],
            default: "user",
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Password hashing is now handled in the repository layer

export default (mongoose.models.User as UserModel) ||
    mongoose.model<IUser, UserModel>("User", userSchema);

