import Joi, { ObjectSchema } from "joi";
import { Credentials } from "../interface";


export const registerUser = {
    body: Joi.object({
        	username: Joi.string().required().messages({
	'string.empty': 'username is required',
    
	}),
	password: Joi.string().min(6).max(36).required().messages({
	'string.empty': 'Password is required',
    'string.min': 'Password should be at least 6 characters long'
	}),
    }). messages({
        "object.unknown": "You have used an invalid key."
    })
};

const userCredentials: ObjectSchema = Joi.object<Credentials>({
	username: Joi.string().required().messages({
	'string.empty': 'username is required',
    
	}),
	password: Joi.string().min(6).max(36).required().messages({
	'string.empty': 'Password is required',
    'string.min': 'Password should be at least 6 characters long'
	}),
});

export { userCredentials };