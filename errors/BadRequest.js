import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";

export class BadRequestError extends CustomError {
  statusCode;

  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export const createBadRequestError = (message) => new BadRequestError(message);
