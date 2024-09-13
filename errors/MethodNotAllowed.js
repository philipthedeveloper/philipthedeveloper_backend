import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";

export class MethodNotAllowedError extends CustomError {
  statusCode;

  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
  }
}

export const createMethodNotAllowedError = (message) =>
  new MethodNotAllowedError(message);
