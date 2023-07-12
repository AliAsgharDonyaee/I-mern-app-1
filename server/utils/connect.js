import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import User from "../models/User.js";
// import Post from "../models/Post.js";
// import { users, posts } from "../data/index.js";

dotenv.config();
const app = express();

const RunningApp = async () => {
	const PORT = process.env.PORT || 6001;
	return mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			app.listen(PORT, () => console.log(`✅ - app listen on port ${PORT}`));
			console.log(`✅ - connect to DB`);

			// todo: add data with run one time
			// User.insertMany(users);
			// Post.insertMany(posts);
		})
		.catch((err) => console.log(`💀 - filed to connect DB\n${err}`));
};

export default RunningApp;
