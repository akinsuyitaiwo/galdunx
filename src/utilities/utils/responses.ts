import { Response, Request } from "express";
import { ErrorResponse, SuccessResponse } from "../interface";

function errorResponse(res: Response, statusCode: number, error: string): Response<ErrorResponse> {
	const responseObject: ErrorResponse = { statusCode, error };
	return res.status(statusCode).json(responseObject);
}

function successResponse(res: Response, statusCode: number, message: string, data: unknown = []): Response<SuccessResponse> {
	const responseObject: SuccessResponse = { statusCode, message, data };
	return res.status(statusCode).json(responseObject);
}

function logError(err: Error, req: Request): void {
	console.error(`
      Error caught at ${req.path}, 
      Request body: ${JSON.stringify(req.body)},
      Request User: ${JSON.stringify(req.user)},
      Request Params: ${JSON.stringify(req.params)},
      Request Query: ${JSON.stringify(req.query)},
      Error Message: ${(err as Error).message},
      Error Stack: ${(err as Error).stack}
  `);
}

export {
	errorResponse,
	successResponse,
	logError
};