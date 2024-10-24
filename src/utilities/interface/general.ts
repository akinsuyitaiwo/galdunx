import { ObjectSchema } from "joi";

export interface ErrorResponse {
    statusCode: number;
    error: string;
}
  
export interface SuccessResponse {
    statusCode: number;
    message: string;
    data: unknown;
}

export interface Schemas {
    [key: string]: ObjectSchema<any>;
}