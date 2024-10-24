// import jwt, { JwtPayload } from "jsonwebtoken";
// import dotenv from "dotenv";
// import { PayloadInterface } from "../interface";

// dotenv.config();
// const secretKey = process.env.JWT_KEY;

// export const generateToken = async (
// 	payload: JwtPayload,
// 	secret = secretKey
// ) => {
// 	const token = jwt.sign(payload, secret as string, { expiresIn: "24h" });
// 	return token;
// };

// export const validateUserToken = async (token: string) => {
// 	try {
// 		const key = process.env.JWT_KEY || "secret";
// 		const data = jwt.verify(token, key) as PayloadInterface;
// 		if (!data) return;
// 		return data;
// 	} catch (e) {
// 		console.error(e);
// 	}
// };

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS as string;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH as string;

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET_ACCESS, { expiresIn: "24h" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET_REFRESH, { expiresIn: "24h" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET_ACCESS);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET_REFRESH);
};
