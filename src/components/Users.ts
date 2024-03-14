import { readUserData, createUserData, updateUserData, deleteUserData, readAllUsersData } from '../api/Users';
import { userModel, usersModel } from '../models/Users';


export const readAllUsers = async (): Promise<{ allUsers: Array<usersModel> } | any> => {
  try {
    const response = await readAllUsersData();

    if (Array.isArray(response.users)) {
      const allUsers = response.users.map((user: userModel) => ({
        _id: user._id,
        username: user.username,
        password: user.password
      }));

    return { allUsers };

    } else {
      console.error('Invalid response format. Expected an array.');
      return null;
    }

  } catch (error: any) {
    console.error(`Failed to read all users: ${error.message}`);
  }
}

export const readUser = async (getID: string): Promise<usersModel | any> => {
  try {
    const user: userModel = { _id: getID };
    const response: usersModel = await readUserData(user);

    const _id = response.user._id;
    const username = response.user.username;
    const password = response.user.password;

    return { _id, username, password };
    


  } catch (error: any) {
    console.error(`Failed to read user: ${error.message}`);
  }
};

export const createUser = async (getUsername: string, getPassword: string) => {
  const newUser: userModel = {
    username: getUsername,
    password: getPassword,
  };
  try {
    const response = await createUserData(newUser);
    console.log(`User created successfully:`, response);
    return response.user;
  } catch (error: any) {
    console.error(`Failed to delete user: ${error.message}`);
  }
};

export const updateUser = async (getID: string, getUsername: string, getPassword: string) => {
  const newUser: userModel = {
    _id: getID,
    username: getUsername,
    password: getPassword
  };
  try {
    const response = await updateUserData(newUser);
    console.log(`User update successfully:`, response);
    return response.users;

  } catch (error: any) {
    console.error(`Failed to update user: ${error.message}`);
  }
};

export const deleteUser = async (getID: string) => {
  const newUser: userModel = {
    _id: getID
  };
  try {
    const response = await deleteUserData(newUser);
    console.log('User Deleted!', response);

  } catch (error: any) {
    console.error(`Failed to delete user: ${error.message}`);
  }
};
