import { Request, Response, NextFunction } from "express";

const options = {
  stripUnknown: true,
  abortEarly: false,
  errors: {
    wrap: {
      label: ""
    }
  }
};

const validate = (schemas: any, values: any) => {
  let error = [];
  for (let paramToValidate of Object.keys(schemas)) {
    const value = values[paramToValidate];
    if (value) {
      const schema = schemas[paramToValidate];
      let result = schema.validate(values[paramToValidate], options);
      if (result.error) {
        error.push(
          result.error.details.map(
            (detail:any) => `${detail.message}`
          )
        );
      } else {
        values[paramToValidate] = result.value;
      }
    } else {
      error.push(`${paramToValidate} missing`);
    }
  }
  if (error.length > 0) return { error: error.flat() };
  return {};
};

const validator = (requestSchema: any, auth = true) => (req: Request, res: Response, next: NextFunction) => {
  const schema = auth
    ? {
      ...requestSchema,
    }
    : requestSchema;
  let validationResult = validate(schema, req);
  if (validationResult.error) {
     res.status(422).json({
      success: false,
      msg: validationResult.error[0],
      status: 422
    });
  } return next();
};

export default validator;