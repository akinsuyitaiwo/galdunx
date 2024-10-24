import { Request, Response } from "express";
import { registerUser, loginUser, getAllUsers } from "../service";
import { errorResponse, logError, successResponse } from "../utilities";

export const register = async (req: Request, res: Response):Promise<any> => {
  try {
    const user = await registerUser(req.body);
    if(!user){
      return errorResponse(res, 409, "not found")
    }
    return successResponse(res, 201, "User created", user)
  } catch (error) {
    logError((error as Error), req);
    return errorResponse(res, 500, "Server error")
  }
};

export const login = async(req: Request, res: Response):Promise<any> => {
    try{
        const {refreshToken, accessToken} = await loginUser(req.body);
        return successResponse(res, 200, "User logged in", {refreshToken, accessToken})
    } catch(error){
        logError((error as Error), req);
        return errorResponse(res, 500, "Server error")
        
    }
}

export const getUsers = async(req: Request, res: Response):Promise<any> => {
    try{
        const users = await getAllUsers()
        return successResponse(res, 200, "User fetched successfully", users)
        
    }   catch(error){
        logError((error as Error), req);
        return errorResponse(res, 500, "Server error")
                
    }
}