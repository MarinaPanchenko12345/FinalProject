import { User } from "../../auth/model/userMongoose.mjs";

//Service for Get all users
export const getAllUsers = async () => {
  const users = await User.find({ isDeleted: { $ne: true } });
  return users;
};

// Service to get deleted users
export const getDeletedUsers = async () => {
  const users = await User.find({ isDeleted: true });
  return users;
};

// Service to restore a deleted user
export const restoreUser = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isDeleted: false },
    { new: true }
  );

  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  return user;
};

//Service for Get user by id
export const getUserById = async (id, currentUser) => {
  const user = await User.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  if (
    !currentUser.isAdmin &&
    user._id.toString() !== currentUser._id.toString()
  ) {
    throw {
      status: 403,
      message:
        "Access denied: only the owner or an admin can access this user.",
    };
  }
  return user;
};

//Service for Edit user
export const updateUser = async (id, currentUser, updateData) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  if (user._id.toString() !== currentUser._id.toString()) {
    throw {
      status: 403,
      message:
        "Access denied: Access is allowed only to the owner of this user.",
    };
  }
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedUser;
};

//Service for Change isBusiness status
export const toggleBusinessStatus = async (id, currentUser) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  if (user._id.toString() !== currentUser._id.toString()) {
    throw {
      status: 403,
      message:
        "Access denied: Access is allowed only to the owner of this user.",
    };
  }
  user.isBusiness = !user.isBusiness;
  await user.save();
  return user;
};

//Service for Delete user
export const deleteUser = async (id, currentUser) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!user) {
    throw {
      status: 404,
      message: "User not found or already deleted",
    };
  }
  if (
    !currentUser.isAdmin &&
    user._id.toString() !== currentUser._id.toString()
  ) {
    throw {
      status: 403,
      message:
        "Access denied: Access is allowed only to the owner of this user or an Admin.",
    };
  }
  await User.findByIdAndUpdate(id, { isDeleted: true });
  return user;
};
