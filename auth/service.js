const User = require("./models/User");

const createUserToDB = async (user) => {
  return await User.create({ ...user });
};
const getAllUsersFromDB = async () => {
  return await User.findAll();
};

const getUserByIdFromDB = async (id) => {
  return await User.findOne({
    where: { id: id },
  });
};

const getUserByNameFromDB = async (name) => {
  return await User.findOne({
    where: { name: name },
  });
};

module.exports = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  getUserByNameFromDB,
};
