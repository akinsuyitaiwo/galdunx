// import { Request, Response, NextFunction } from "express";
// import { verifyAccessToken, errorResponse, logError } from "../utilities";
// import models from "../model";


// export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		let token;

// 		if (req.headers && req.headers.cookie) {
// 			const cookies = req.headers.cookie.split("; ");
// 			const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
		
// 			if (tokenCookie) {
// 				token = tokenCookie.split("=")[1];
// 			} else {
// 				errorResponse(res, 401, "Token cookie not found");
// 				return;
// 			}
// 		}

// 		if (!token) {
// 			errorResponse(res, 403, "Authorization not found");
// 			return
// 		}
// 		const decoded = await verifyAccessToken(token);
// 		const user = await models.User.findById(decoded as any);
// 		if (!user) {
// 			errorResponse(res, 404, "User account not found");
// 			return;
// 		}

// 		req.user = user;
// 		return next();
// 	} catch (error) {
// 		logError((error as Error), req);
// 		errorResponse(res, 500, "Internal Server error");
// 		return;
// 	}
// };


import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from "../utilities";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
	 return;
  }

  try {
    const decoded = verifyAccessToken(token);
    req.body.userId = (decoded as any).userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
	return;
  }
};

