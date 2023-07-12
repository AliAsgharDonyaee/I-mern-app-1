import User from "../models/User.js";

// todo: read
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		// todo: find friends user
		const friends = await Promise.all(user.friend.map((id) => User.findById(id)));

		// todo: find datas friends user
		const formattedFriend = friends.map(({ _id, firstName, lastName, picturePath, location, occupation }) => {
			return { _id, firstName, lastName, picturePath, location, occupation };
		});
		res.status(200).json(formattedFriend);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

// todo: update
export const addRemveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			user.friends.push(friendId);
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		const friends = await Promise.all(user.friend.map((id) => User.findById(id)));

		const formattedFriend = friends.map(({ _id, firstName, lastName, picturePath, location, occupation }) => {
			return { _id, firstName, lastName, picturePath, location, occupation };
		});
		res.status(200).json(formattedFriend);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
