import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 3,
			max: 54,
		},
		lastName: {
			type: String,
			required: true,
			min: 3,
			max: 54,
		},
		email: {
			type: String,
			required: true,
			max: 54,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		picturePath: {
			type: String,
			default: "",
		},
		friends: {
			type: Array,
			default: [],
		},
		location: String,
		occupation: String,
		viewedProfile: Number,
		impressions: Number,
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
