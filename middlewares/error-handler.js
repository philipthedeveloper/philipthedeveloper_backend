import { StatusCodes, ReasonPhrases } from "http-status-codes";
import CustomError from "../errors/CustomError.js";

// Define a type guard function to check if an object implements CustomErrorInterface
function isCustomError(error) {
  return typeof error === "object" && "statusCode" in error;
}

export const errorHandler = (err, req, res, next) => {
  let errorObject = {};

  console.log(err);

  if (err instanceof CustomError && isCustomError(err)) {
    errorObject.status = err?.statusCode;
    errorObject.message = err.message;
  }
  if (err && err.name === "ValidationError") {
    errorObject.status = StatusCodes.BAD_REQUEST;
    errorObject.message = err.message;
  }

  if (
    err &&
    (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")
  ) {
    errorObject.message = err.message;
    errorObject.status = StatusCodes.UNAUTHORIZED;
  }
  if (err && err.name === "CastError") {
    errorObject.message = `${err?.value} is not a valid ${err?.kind}`;
    errorObject.status = StatusCodes.BAD_REQUEST;
  }
  if (
    err &&
    (err.type === "entity.parse.failed" || err.name === "SyntaxError")
  ) {
    errorObject.status = err?.statusCode || err?.status;
    errorObject.message = "JSON"
      ? "Invalid JSON format in the request body. Please ensure there are no trailing commas."
      : "Syntax Error: Invalid data format.";
  }

  if (err && err.name === "MulterError") {
    errorObject.status = StatusCodes.UNPROCESSABLE_ENTITY;
    errorObject.message = `${err?.message} ${err.field}`;
  }

  let status = errorObject?.status || StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(status).json({
    success: false,
    status,
    message: errorObject?.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};

export default errorHandler;
