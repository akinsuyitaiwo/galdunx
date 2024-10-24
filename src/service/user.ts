import models from "../model"
import { comparePasswords, hashPassword, generateAccessToken, generateRefreshToken, IUser } from "../utilities"


export const registerUser = async( data: { username: string; password: string }) => {
    const { username, password } = data

  const userExist = await models.User.findOne({ username })
  if (userExist) {
    throw new Error( "User with user already exists")
  } 
  	const hashedPassword = await hashPassword(password);
		return await models.User.create({
			username,
			password: hashedPassword
		});
}
  
export const loginUser = async( data: { username: string; password: string }) => {
    const { username, password } = data;

  const user = await models.User.findOne({username});
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new Error( 'Invalid credentials');
    
}
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
}

export const getAllUsers = async() => {
  return await models.User.find()

}