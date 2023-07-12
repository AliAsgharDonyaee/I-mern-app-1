import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// todo: register user
export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body;
		const sult = await bcrypt.genSalt();
		// todo: hashing password user
		const passwordHash = await bcrypt.hash(password, sult);
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});
		const savadUser = await newUser.save();
		res.status(201).json(savadUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// todo: login user
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		// todo: match email
		const user = await User.findOne({
			email,
		});
		if (!user) return res.status(400).json({ message: "User does not exist." });

		// todo: match password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

		// todo: match token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;
		res.status(200).json({ token: user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
