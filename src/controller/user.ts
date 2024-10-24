import { Request, Response } from "express";
import { registerUser, loginUser, getAllUsers } from "../service";
import { errorResponse, logError, successResponse } from "../utilities";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    successResponse(res, 201, "User created", user)
    return;
  } catch (error) {
    logError((error as Error), req);
    errorResponse(res, 500, "Server error")
    return;
  }
};

export const login = async(req: Request, res: Response) => {
    try{
        const {refreshToken, accessToken} = await loginUser(req.body);
        successResponse(res, 200, "User logged in", {refreshToken, accessToken})
        return;
    } catch(error){
        logError((error as Error), req);
        errorResponse(res, 500, "Server error")
        return;
    }
}

export const getUsers = async(req: Request, res: Response) => {
    try{
        const users = await getAllUsers()
        successResponse(res, 200, "User fetched successfully", users)
        return;
    }   catch(error){
        logError((error as Error), req);
        errorResponse(res, 500, "Server error")
        return;        
    }
}