// todo: softwares imports
import express from "express";
import multer from "multer";

// todo: middlwares files imports
import { verifyToken } from "./middleware/auth.js";

// todo: controllers files imports
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

// todo: routes files imports
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";

// todo: utils files imports
import RunningApp from "./utils/connect.js";
import Configuration from "./utils/configuration.js";

const app = express();

// todo: configuration
Configuration();

// todo: file storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/assets");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

// todo: routes with files
app.post("/auth/register", upload.single("picture"), verifyToken, register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// todo: routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// todo: mongoose setup(run app and mongodb)
RunningApp();
