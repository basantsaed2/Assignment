import { where } from "sequelize";
import { User } from "../../database/models/users.schema.js";

const creatUser = async (data) => {
  try {
    const { name, email, password, role } = data;
    const users = await User.findOne({ where: { email } });

    if (users) {
      return { status: 400, message: "Email already exists" };
    }

    const userInstance = User.build({ name, email, password, role });
    await userInstance.save();

    return {
      status: 201,
      message: "user created sucessfully",
      data: userInstance,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const updateUser = async (data, id) => {
  try {
    const { name, email, password, role } = data;
    const user = await User.findByPk(id);
    if (user) {
      await user.update({ name, email, password, role }, { validate: false });
      return {
        status: 200,
        message: "User updated or created successfully",
        data: user,
      };
    } else {
      const newUser = await User.create(
        { id, name, email, password, role },
        { validate: false },
      );
      return {
        status: 201,
        message: "User updated or created successfully",
        data: newUser,
      };
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getUserByEmail = async (email) => {
  try {
    const userExist = await User.findOne({ where: { email: email } });

    if (userExist) {
      return { status: 200, user: userExist };
    } else {
      return { status: 400, message: "user not found" };
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

const getUserById = async (id) => {
  try {
    const userExist = await User.findByPk(id , {attributes : {exclude : ["role"]}});
    if (userExist) {
      return { status: 200, user: userExist };
    } else {
      return { status: 404, message: "user not found" };
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

export { creatUser , updateUser , getUserByEmail , getUserById};
